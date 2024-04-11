import { useEffect, useState } from "react";
import AwayMode from "../shp/AwayMode";
import { addMotionSensor, getAllSensors, getLatestOutput, triggerAlert, triggerAlertStalling, triggerSensor } from "./shpApi";

const Shp = ({ shpDoors, shpWindows, awayModeSet, awayModeVar }) => {
    const [output, setOutput] = useState('');
    const [latestOutput, setLatestOutput] = useState('');

    const captureEvents = async () => {
        try {
            const latestOutputResult = await getLatestOutput();
            setLatestOutput(`\n${latestOutputResult}`);
        } catch (error) {
            console.error("Error capturing events:", error);
        }
    };

    const handleCreateSensor = async () => {
        const x = prompt("Enter the X coordinate for the sensor:");
        const y = prompt("Enter the Y coordinate for the sensor:");
    
        if (x !== null && y !== null && !isNaN(x) && !isNaN(y)) {
            try {
                await addMotionSensor(parseInt(x, 10), parseInt(y, 10));
                captureEvents();
                console.log(`Motion Sensor Added at location x=${x} and y=${y}`);
            } catch (error) {
                console.error("Error adding sensor:", error);
            }
        } else {
            console.log("Sensor creation cancelled or invalid coordinates provided.");
        }
    };

    const handleTriggerSensor = async () => {
        try {
            const sensors = await getAllSensors();
            if (sensors.length === 0) {
                console.log("No sensors available to trigger.");
                return;
            }
    
            const sensorOptions = sensors.map((sensor, index) => `${index}: Sensor at X=${sensor.positionX}, Y=${sensor.positionY}`).join("\n");
            const chosenSensorIndex = prompt(`Which sensor would you like to trigger?\n${sensorOptions}`);
    
            if (chosenSensorIndex !== null && !isNaN(chosenSensorIndex) && sensors[chosenSensorIndex]) {
                await triggerSensor(sensors[chosenSensorIndex].id);
                captureEvents();
                console.log(`Sensor with ID ${sensors[chosenSensorIndex].id} triggered.`);
            } else {
                console.log("Sensor triggering cancelled or invalid selection.");
            }
        } catch (error) {
            console.error("Error triggering sensor:", error);
        }
    };
    

    const handleTriggerAlert = async () => {
        await triggerAlert();
        captureEvents();
    };

    const handleTriggerAlertStalling = async () => {
        await triggerAlertStalling();
        captureEvents();
    };

    useEffect(() => {
        const interval = setInterval(captureEvents, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!awayModeVar) {
            setOutput('');
            setLatestOutput('');
        }
    }, [awayModeVar]);

    return (
        <div id="awayModeCtn" className="px-4 py-2 space-y-2">
            <p className="font-bold"><b>Away Mode</b></p>
            <AwayMode layoutDoors={shpDoors} layoutWindows={shpWindows} setAwayModeEnabled={awayModeSet} awayModeEnabled={awayModeVar}/>
            
            <div className="sensor-actions flex space-x-2">
                <button onClick={handleCreateSensor} className="px-4 py-2 rounded bg-blue-500 text-white">Create Sensor</button>
                <button onClick={handleTriggerSensor} className="px-4 py-2 rounded bg-green-500 text-white">Trigger Sensor</button>
                <button onClick={handleTriggerAlert} className="px-4 py-2 rounded bg-yellow-500 text-white">Trigger Alert</button>
                <button onClick={handleTriggerAlertStalling} className="px-4 py-2 rounded bg-red-500 text-white">Trigger Alert Stalling</button>
            </div>

            <div className="console-box bg-gray-100 p-4 rounded-lg mt-4 max-h-75 overflow-y-auto">
                <h3 className="font-semibold">Console:</h3>
                {output && <p>{output}</p>}
                {latestOutput && <p>{latestOutput}</p>}
            </div>
        </div>
    );
}

export default Shp;
