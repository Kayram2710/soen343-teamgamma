import { useEffect, useState } from "react";
import {getOutput} from "../shp/shpApi.js";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./SH_Dashboard.css";


const EventLog = () => {

    const LogWindow = ({ isOpen, output }) => {
        if (!isOpen) return null;
    
        return (
            <div className="settingsModal " >
                <div className="settingsModalContent">
                    <div
                        id="closeSettingsCtn"
                        className="w-full text-right"
                        style={{
                            zIndex: "99",
                            position: "relative",
                            marginBottom: "-1rem",
                        }}
                    >
                    <button id="closeSettingsBtn">
                        <FontAwesomeIcon
                            icon={faClose}
                            style={{ fontSize: "1.25rem" }}
                            onClick={closeOverlay}
                        />
                    </button>
                    </div>
                    <p className="font-bold text-center" ><b>Event Log</b></p>
                    <div style={{ maxHeight: '600px', overflow: 'auto' }}>
                        <pre style={{ whiteSpace: 'pre-wrap', maxWidth: '100%' }}>{output}</pre>
                    </div>
                </div>
            </div>
        );
    };

    const [showOverlay, setShowOverlay] = useState(false);
    const [outputLog, setOutput] = useState('');

    const openOverlay = async () => {
        setShowOverlay(true);
        setOutput(await getOutput());
    };

    const closeOverlay = () => {
        setShowOverlay(false);
    };


    return (
    <div>
        <div id="shdOutputConsole" className="flex align-center justify-center">
            <Button size="sm" color="blue" onClick={() => openOverlay()} >Open Log</Button>
        </div>
        {<LogWindow isOpen={showOverlay} output={outputLog}/>}
    </div>
    );
}

export default EventLog;
