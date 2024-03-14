import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCloud, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const SimulationControl = () => {

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [settings, setSettings] = useState({
    profile: '',
    date: '',
    time: '',
    location: ''
  });

// must dynamically adjust the options for the select element
const profiles = ["profile1", "profile2", "profile3"];
const houseLocations = ["Living Room", "Kitchen", "Bedroom"];

  const handleOpenSettings = () => {
    setIsSettingsModalOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value
    }));
  };

  const handlePermissionsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setPermissions(selectedOptions);
  };

const SettingsModal = ({ isOpen, onClose, settings, onInputChange }) => {
  if (!isOpen) return null;

  return (
    <div className="settingsModal">
      <div className="settingsModalContent">
        <h2>Simulation Settings</h2>
        <form>
          <label>
            Select a profile:
            {/* need to dynamically adjust */}
            <select
                name="profile"
                value={settings.profile}
                onChange={handleInputChange}
                >
                {profiles.map((profile, index) => (
                    <option key={index} value={profile}>
                    {profile}
                    </option>
                ))}
                </select>
          </label>
          <label>
            Set date and time:
            <input type="datetime-local" name="date" value={settings.date} onChange={handleInputChange} />
          </label>
          <label>
            Set house location:
            <select
            name="houseLocation"
            value={settings.houseLocation}
            onChange={handleInputChange}
            >
            {houseLocations.map((location, index) => (
                <option key={index} value={location}>
                {location}
                </option>
            ))}
            </select>          
            </label>
          <label>
            Select profile permissions:
            <select name="permissions" value={permissions} onChange={handlePermissionsChange}  multiple={true}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="guest">Guest</option>
              {/* // we'll need to dynamically adjust the options for the select element */}
            </select>
          </label>
          <button type="button" onClick={onClose}>Close</button>
          <button type="submit">Save Settings</button>
        </form>
      </div>
    </div>
  );
};

  const handleStart = () => {
    document.getElementById("startSimulationBtn").style.display = "none";
    document.getElementById("stopSimulationBtn").style.display = "block";
    document.getElementById("simulationCtn").style.backgroundColor =
      "var(--red)";
  };
  const handleStop = () => {
    document.getElementById("startSimulationBtn").style.display = "block";
    document.getElementById("stopSimulationBtn").style.display = "none";
    document.getElementById("simulationCtn").style.backgroundColor =
      "var(--green)";
  };

  const today = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const currentTime = hours + ":" + minutes;



  return (
     <div className="simulationControlContainer">
      {/* Adjusted layout */}
      <div className="simulationControl">
        <div className="profileIconCtn">
          <FontAwesomeIcon icon={faUserCircle} size="3x" />
          <p>Parent</p>
        </div>

        <div className="locationInfo">
          <p>Location: Kitchen</p>
        </div>

        <div className="temperatureInfo">
          <p>Outside Temp. 15°C</p>
        </div>

        <div className="dateInfo">
          <p>Wed Mar 13 2024</p>
        </div>

        <div className="timeInfo">
          <p>19:30:55</p>
        </div>

        <div className="timeSpeedControl">
          <p>Time speed</p>
          <input type="range" />
        </div>

        <div className="simulationToggle">
          <button id="startSimulationBtn" onClick={handleStart}>Start</button>
          <button id="stopSimulationBtn" onClick={handleStop} style={{ display: 'none' }}>Stop</button>
        </div>

        <div className="settingsCtn">
          <button id="simSettingsBtn" onClick={handleOpenSettings}>Settings</button>
        </div>
      </div>
      <SettingsModal
      isOpen={isSettingsModalOpen}
      onClose={handleCloseSettings}
      settings={settings}
      onInputChange={handleInputChange}
    />
    </div>
  );
};



export default SimulationControl;