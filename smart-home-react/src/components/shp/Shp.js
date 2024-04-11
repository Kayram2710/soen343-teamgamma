import { useState } from "react";
import AwayMode from "../shp/AwayMode";
import { getOutput,getAllSensors,getLatestOutput,triggerAlert,triggerSensor,addMotionSensor, triggerAlertStalling} from "./shpApi";

const Shp = ({ shpDoors, shpWindows , awayModeSet, awayModeVar}) => {

    //Demo for the api
    const demo = async () => {
        console.log("Demo Start =============================");
        console.log("Get output function is being called, returns as:\n"+await getOutput());
        console.log("Get latest output function is being called, returns as:\n"+await getLatestOutput());
        console.log("Motion Sensor Added at location x=45 and y=25:\n"+await addMotionSensor(45,25));
        console.log("All Sensors:\n"+await getAllSensors());
        console.log("TriggerSensor function is being called on first sensor:\n"+await triggerSensor(0));
        console.log("Sensor Triggered\nRunning Latest Output function, returns as:\n"+await getLatestOutput());
        console.log("TriggerAlert function being called (no Stall)"+await triggerAlert());
        console.log("Alert Triggered.\nRunning Latest Output function, returns as:\n"+await getLatestOutput());
        console.log("TriggerAlertStalling function is being called for 5 seconds");
        await triggerAlertStalling(5); //this function will stop the function
        console.log("Stalling Done. Running Latest Output function, returns as:\n"+await getLatestOutput());
        console.log("Get output function is being called again, returns as:\n"+await getOutput());
        console.log("API Demo End =============================");
    };

    return (    
        <div
            id="awayModeCtn"
            className="px-4 py-2 gap-2">
            <p>
                <b>Away Mode</b>
            </p>
            <AwayMode layoutDoors={shpDoors} layoutWindows={shpWindows} setAwayModeEnabled={awayModeSet} awayModeEnabled={awayModeVar}/>
            
            <button
                  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={() => demo()}
                >Demo (Check Console)</button>
            
        </div>
    );


};

export default Shp;