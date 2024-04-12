import { useEffect, useState } from "react";
import {getLatestOutput} from "../shp/shpApi.js";
import "./SH_Dashboard.css";


const Console = () => {
    const [latestOutput, setLatestOutput] = useState('');

    const captureEvents = async () => {
        try {
            const latestOutputResult = await getLatestOutput();
            setLatestOutput(`\n${latestOutputResult}`);
        } catch (error) {
            console.error("Error capturing events:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(captureEvents, 100);
        return () => clearInterval(interval);
    }, []);


    return (
          <div
            id="shdOutputConsole"
            className="flex align-center justify-center"
          >
            {latestOutput && <p>{latestOutput}</p>}
          </div>
    );
}

export default Console;
