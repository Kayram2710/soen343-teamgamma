import { useEffect, useState } from "react";
import AwayMode from "../shp/AwayMode";
import { addMotionSensor, getAllSensors, triggerAlert, triggerAlertStalling, triggerSensor } from "./shpApi";

const Shp = ({ shpDoors, shpWindows, awayModeSet, awayModeVar }) => {
    const [newSensorX, setX] = useState(0);
    const [newSensorY, setY] = useState(0);
    const [sensors, setSensors] = useState([]);
    const [alertTime, setTime] = useState(0);
    const [alert, setToggle] = useState(false);


    const handleToggle = () => {
        setToggle(!alert);
    };

    const handleAlertTimeChange = (e) => {
        setTime(parseInt(e.target.value));
    };

    useEffect(() => {
        fetchSensors();
    }, []);

    const fetchSensors = async () => {
        try {
          const sensorList = await getAllSensors();
          setSensors(sensorList);
        } catch (error) {
          console.error('Error fetching sensors:', error);
        }
    };

    const handleCreateSensor = async (e) => {
        e.preventDefault();
    
            try {
                await addMotionSensor(newSensorX,newSensorY);
                fetchSensors();
                captureEvents();
                console.log(`Motion Sensor Added at location x=${newSensorX} and y=${newSensorY}`);
            } catch (error) {
                console.error("Error adding sensor:", error);
            }
    };

    const checkTrigger = async (index) => {
        await triggerSensor(index);
    };

    return (
        <div id="awayModeCtn" className="px-4 py-2 space-y-2">
            <p className="font-bold"><b>Away Mode</b></p>
            <AwayMode layoutDoors={shpDoors} layoutWindows={shpWindows} setAwayModeEnabled={awayModeSet} awayModeEnabled={awayModeVar}/>
            <p className="font-bold" ><b>Create A New Sensor:</b></p>
            <form onSubmit={handleCreateSensor}>
                <input
                    type="number"
                    value={newSensorX}
                    onChange={(e) => setX(e.target.value)}
                    placeholder="X coordinate"
                    style={{border: "2px solid #000000", marginRight: '10px', padding: '5px' }}
                    required
                />
                <input
                    type="number"
                    value={newSensorY}
                    onChange={(e) => setY(e.target.value)}
                    placeholder="Y coordinate"
                    style={{border: "2px solid #000000", marginRight: '10px', padding: '5px' }}
                    required
                />
                <button type="submit">Submit</button>
            </form>

            <p className="font-bold" ><b>List of Sensors:</b></p>
            <ul style={{ maxHeight: '280px', overflow: 'auto' }}>
                {sensors.map((sensor, index) => (
                <li key={index}>
                    <h3>Sensor {index}:</h3>
                    <p>X position = {sensor.positionX} Y position = {sensor.positionY}   
                    <button onClick={() => checkTrigger(index)} className="rounded bg-green-500 text-white px-1 mx-4">Trigger Sensor</button>
                    </p>
                    <br></br>
                </li>
                ))}
            </ul>
            <label>
                <p className="font-bold" >Alert Authorities When Sensor Trigger:</p>
                <input 
                type="checkbox" 
                checked={alert} 
                onChange={handleToggle} 
                style={{ marginLeft: '10px' }} 
                />
            </label>
            <div style={{ opacity: alert ? 1 : 0.5 }} >
                Alert Authorities After: 
                <input 
                    min={0} 
                    type="number" 
                    value={alertTime} 
                    onChange={handleAlertTimeChange} 
                    style={{ border: "2px solid #000000", width: '10%'}} 
                    disabled={!alert}
                    className="rounded px-1 mx-4"
                />
                seconds
            </div>
        </div>
    );
}

export default Shp;
