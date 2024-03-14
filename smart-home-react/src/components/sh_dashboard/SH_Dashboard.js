import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faCloud,
  faPlay,
  faStop,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import "./SH_Dashboard.css";
import HouseLayout from '../house/HouseLayout';
import Shc from '../shc/Shc';

const SH_Dashboard = (props) => {

  /////////////////////////////////////////////////
  //Yousef's Implementation

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

//End of Yousef's Implementation
////////////////////////////////////////////

  const { loggedInUser, setLoggedInUser } = props;
  const [shdControllerActiveTab, setshdControllerActiveTab] = useState("SHC");
  const navigate = useNavigate();

  const onLogout = () => {
    setLoggedInUser(null);
  };

  const handleStart = () => {
    document.getElementById("startSimulationBtn").style.display = "none";
    document.getElementById("stopSimulationBtn").style.display = "block";
    document.getElementById("simulationCtn").style.backgroundColor = "var(--red)";

    start();
  };

  const start = async () => {
    console.log("started");
    const runSim = await startSim();
  }

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
    <div className="dashboardMasterCtn flex justify-center">
      <div id="dashboardMainCtn">
        <div className="dashboardTitle" style={{ fontSize: "1.25rem" }}>
          <b>My Smart Home Dashboard</b>
        </div>

        <div id="dashboardMiddleCtn" className="grid">
          <div id="dashboardProfileCtn" className="flex f-col justify-center">
            <div
              className="p-4 flex f-col"
              style={{ justifyContent: "space-between", minHeight: "100%" }}
            >
              <div
                id="simulationCtn"
                className="flex align-center justify-center"
              >
                <button id="startSimulationBtn" onClick={handleStart}>
                  Start Simulation &nbsp;
                  <FontAwesomeIcon icon={faPlay} />
                </button>
                <button id="stopSimulationBtn" onClick={handleStop}>
                  Stop Simulation &nbsp;
                  <FontAwesomeIcon icon={faStop} />
                </button>
              </div>
              <div>
                <div
                  id="shdProfileSettings"
                  className="topCtnPadding justify-center align-middle mb-4"
                >
                  <div id="profileIconCtn">
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className="profileIcon"
                    />
                  </div>
                  <div id="profileTitle">
                    <p>Jane {/* loggedInUser.username */}</p>
                  </div>
                </div>
                <div
                  id="userLocationCtn"
                  className="flex align-center topCtnPadding"
                >
                  <p>Location: Living Room{/* make location dynamic */}</p>
                </div>
                <div id="dateCtn" className="flex align-center topCtnPadding">
                  <p>{formattedDate}</p>
                </div>
                <div id="timeCtn" className="flex align-center topCtnPadding">
                  <p>{currentTime}</p>
                </div>
                <div
                  id="temperatureCtn"
                  className="flex f-col align-middle topCtnPadding"
                >
                  <p>Outside Temp: </p>
                  <div className="flex align-center" style={{ gap: "0.25rem" }}>
                    <p>8˚C</p>
                    <FontAwesomeIcon icon={faCloud} />
                  </div>
                </div>
              </div>
              <div id="simSettingsCtn" className="flex align-center">
                <button id="simSettingsBtn" onClick={handleOpenSettings} >
                  Settings &nbsp; <FontAwesomeIcon icon={faGear} />
                </button>
              </div>
            </div>
          </div>

          <HouseLayout />

          <div id="shdControllerMainContent" className="flex f-col">
            <div id="shdControllerCtn">
              <div id="shdTopMenuBar" className="flex align-center">
                <div
                  id="shdmi-1"
                  className="shdMenuItem flex active"
                  style={{ borderRadius: "0.5rem 0 0 0" }}
                  onClick={() => {
                    document
                      .querySelectorAll(".shdMenuItem")
                      .forEach((item) => {
                        item.classList.remove("active");
                      });
                    document.getElementById("shdmi-1").classList.add("active");
                    setshdControllerActiveTab("SHC");
                  }}
                >
                  <p className="shdMenuItemText">SHC</p>
                </div>
                <div
                  id="shdmi-2"
                  className="shdMenuItem flex shdMenuPadding"
                  onClick={() => {
                    document
                      .querySelectorAll(".shdMenuItem")
                      .forEach((item) => {
                        item.classList.remove("active");
                      });
                    document.getElementById("shdmi-2").classList.add("active");
                    setshdControllerActiveTab("SHS");
                  }}
                >
                  <p className="shdMenuItemText">SHS</p>
                </div>
                <div
                  id="shdmi-3"
                  className="shdMenuItem flex shdMenuPadding"
                  onClick={() => {
                    document
                      .querySelectorAll(".shdMenuItem")
                      .forEach((item) => {
                        item.classList.remove("active");
                      });
                    document.getElementById("shdmi-3").classList.add("active");
                    setshdControllerActiveTab("SHP");
                  }}
                >
                  <p className="shdMenuItemText">SHP</p>
                </div>
                <div
                  id="shdmi-4"
                  className="shdMenuItem flex shdMenuPadding"
                  style={{ borderRadius: "0 0.5rem 0 0" }}
                  onClick={() => {
                    document
                      .querySelectorAll(".shdMenuItem")
                      .forEach((item) => {
                        item.classList.remove("active");
                      });
                    document.getElementById("shdmi-4").classList.add("active");
                    setshdControllerActiveTab("SHH");
                  }}
                >
                  <p className="shdMenuItemText">SHH</p>
                </div>
              </div>
            </div>

            <div
              id="shdControllerOutputCtn"
              className="flex align-center justify-center"
            >
              {/* {shdControllerActiveTab} */}
              <Shc></Shc>
            </div>
          </div>
        </div>

        <div id="dashboardBottomCtn">
          <div
            id="shdOutputConsole"
            className="flex align-center justify-center"
          >
            <h3>Output Console</h3>
          </div>
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

export default SH_Dashboard;
