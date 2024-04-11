import { useEffect, useState } from "react";
import AwayMode from "../shp/AwayMode";
import { getLatestOutput, getOutput } from "./shpApi";

const Shp = ({ shpDoors, shpWindows, awayModeSet, awayModeVar }) => {
    const [output, setOutput] = useState('');
    const [latestOutput, setLatestOutput] = useState('');
    
    const captureEvents = async () => {
        try {
            const outputResult = await getOutput();
            setOutput(outputResult);

            const latestOutputResult = await getLatestOutput();
            setLatestOutput(latestOutputResult);
        } catch (error) {
            console.error("Error capturing events:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(captureEvents, 5000)
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (awayModeVar) {
            captureEvents();
        } else {
            setOutput('');
            setLatestOutput('');
        }
    }, [awayModeVar]);

    return (
        <div id="awayModeCtn" className="px-4 py-2 space-y-2">
            <p className="font-bold"><b>Away Mode</b></p>
            <AwayMode layoutDoors={shpDoors} layoutWindows={shpWindows} setAwayModeEnabled={awayModeSet} awayModeEnabled={awayModeVar}/>

            <div className="console-box bg-gray-100 p-4 rounded-lg mt-4 max-h-75 overflow-y-auto">
                <h3 className="font-semibold">Console:</h3>
                {output && <p>{output}</p>}
                {latestOutput && <p>{latestOutput}</p>}
            </div>
        </div>
    );
}

export default Shp;
