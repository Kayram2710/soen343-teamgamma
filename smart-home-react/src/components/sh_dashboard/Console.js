import { useEffect, useState } from "react";
import {getLatestOutput} from "../shp/shpApi.js";
import "./SH_Dashboard.css";


const Console = () => {
    const [latestEvent, setLatestEvent] = useState('');

    const captureEvents = async () => {
        try {
            const latestEvent = await getLatestOutput();
            setLatestEvent(latestEvent);
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
            <p>{latestEvent}</p>
          </div>
    );
}

export default Console;
