import {
  faCloud,
  faGear,
  faPlay,
  faStop,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserProfiles, startSim } from "../../api/apiHelper";
import HouseLayout from '../house/HouseLayout';
import Shc from '../shc/Shc';
import "./SH_Dashboard.css";


const SH_Dashboard = ({user}) => {

  const date = new Date();
  const [profiles, setProfiles] = useState([]);
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const [activeProfileId, setActiveProfileId] = useState('');

  useEffect(() => {
    if (profiles.length > 0) {
        // Select a random profile
        const randomProfileIndex = Math.floor(Math.random() * profiles.length);
        const randomProfile = profiles[randomProfileIndex];
        setActiveProfileId(randomProfile.id);
        // Optionally, save it to localStorage or handle it as needed
        localStorage.setItem('activeProfileId', randomProfile.id);
    }
}, [profiles]);


  // Function to set a profile as active
  const handleSetActiveProfile = useCallback(async (profile) => {

    try {
        setActiveProfileId(profile.id);
        localStorage.setItem('activeProfileId', profile.id);

    } catch (error) {
      console.error('Error during PIN verification:', error);
    }
  }, [user.email]);

  useEffect(() => {
    if (!user) return; // If no userId, do nothing

    getUserProfiles(user.email)
      .then(profiles => {
        setProfiles(profiles);
      })
      .catch(error => {
        console.error('Error fetching profiles:', error);
      })
      .finally(() => {
      });
  }, [user.email]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await getUserProfiles(user.email); // Corrected to getUserProfiles
        setProfiles(response);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
  
    fetchProfiles();
  }, []);

  const formattedDate = date.toLocaleDateString("en-US", options);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const currentTime = hours + ":" + minutes;

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [settings, setSettings] = useState({
    profile: "N/A",  // Set to "N/A" initially
    date: formattedDate,
    time: currentTime,
    location: "Room",
    temperature: 0,
  });

  useEffect(() => {
    const activeProfile = profiles.find(p => p.id === activeProfileId);
    console.log(activeProfile);
    setSettings(prevSettings => ({
      ...prevSettings,
      profile: activeProfile ? activeProfile.profileName : "N/A"
    }));
  }, [profiles, activeProfileId]);

  const handleProfileChange = useCallback(async (event) => {
    const selectedProfileId = event.target.value;
    const selectedProfile = profiles.find(profile => profile.id === selectedProfileId);
        try {
            // Assuming you have a method to validate the selected profil
                setActiveProfileId(selectedProfile.id);
                localStorage.setItem('activeProfileId', selectedProfile.id);
                console.log("worked")
        } catch (error) {
            console.error('Error during profile validation:', error);
        }
}, [profiles]);
  
  

  const [isSimRunning, setRun] = useState(false);


    const handleOpenSettings = () => {
      setIsSettingsModalOpen(true);
    };

    const handleCloseSettings = () => {
      setIsSettingsModalOpen(false);
    };

    const handleInputChange = (event) => {
      const inputValue = event.target.value;
      const selectedProfile = profiles.find(profile => profile.id === inputValue);
      handleSetActiveProfile(selectedProfile);
    };

    const handlePermissionsChange = (e) => {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      setPermissions(selectedOptions);
    };

  const SettingsModal = ({ isOpen, settings }) => {
    if (!isOpen) return null;

    return (
      <div className="settingsModal">
        <div className="settingsModalContent">
          <h2>Simulation Parameter</h2>
          <form>
            <label>
              Select a profile:
              {/* need to dynamically adjust */}
              <select
                  name="profile"
                  value={activeProfileId}
                  onChange={handleProfileChange}
              >
                  {profiles.map((profile) => (
                      <option key={profile.id} value={profile.id}>
                          {profile.profileName}
                      </option>
                  ))}
              </select>
            </label>
            <label>
              Set date:
              <input type="date" name="date" value={settings.date} onChange={handleInputChange} />
            </label>
            <label>
              Set Time:
              <input type="time" name="time" value={settings.time} onChange={handleInputChange} />
            </label>
            <label>
              Set outside temperature:
              <input type="number" name="temperature" value={settings.temperature} onChange={handleInputChange} />
            </label>
            <label>
              Set house location:
              <select
              name="location"
              value={settings.location}
              onChange={handleInputChange}
              >
              {profiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                  {profile.houseLocation}
                  </option>
              ))}
              </select>          
              </label>
            <label>
              Select profile permissions:
              <select name="permissions" value={permissions} onChange={handlePermissionsChange}  multiple={true}>
                <option value="Parent">Parent</option>
                <option value="Child">Children</option>
                <option value="Stranger">Stranger</option>
                <option value="Guest">Guest</option>
                {/* // we'll need to dynamically adjust the options for the select element */}
              </select>
            </label>
            <button type="button" id="simParam" onClick={handleStart}>Set Parameters </button>
          </form>
        </div>
      </div>
    );
  };

  const [shdControllerActiveTab, setshdControllerActiveTab] = useState("SHC");
  const navigate = useNavigate();

  const popup = () =>{
    
    handleOpenSettings();
  }

  const handleStart = async () => {

    handleCloseSettings();

    setRun(true);

    document.getElementById("simSettingsCtn").style.visibility="visible";
    document.getElementById("shc-content").style.visibility="visible";
    document.getElementById("startSimulationBtn").style.display = "none";
    document.getElementById("stopSimulationBtn").style.display = "block";
    document.getElementById("simulationCtn").style.backgroundColor = "var(--red)";

    console.log("started");
    const runSim = await startSim();
  };

  const handleStop = () => {

    setRun(false);

    document.getElementById("shc-content").style.visibility="hidden";
    document.getElementById("simSettingsCtn").style.visibility="hidden";
    document.getElementById("startSimulationBtn").style.display = "block";
    document.getElementById("stopSimulationBtn").style.display = "none";
    document.getElementById("simulationCtn").style.backgroundColor = "var(--green)";
  };

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
                <button id="startSimulationBtn" onClick={popup}>
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
                    <p> {settings.profile}</p>
                  </div>
                </div>
                <div
                  id="userLocationCtn"
                  className="flex align-center topCtnPadding"
                >
                  <p>Location: {settings.location}</p>
                </div>
                <div id="dateCtn" className="flex align-center topCtnPadding">
                  <p>{settings.date}</p>
                </div>
                <div id="timeCtn" className="flex align-center topCtnPadding">
                  <p>{settings.time}</p>
                </div>
                <div id="timeCtn" className="flex align-center topCtnPadding">
                  <p>Permission Profile: {permissions}</p>
                </div>
                <div
                  id="temperatureCtn"
                  className="flex f-col align-middle topCtnPadding"
                >
                  <p>Outside Temp: </p>
                  <div className="flex align-center" style={{ gap: "0.25rem" }}>
                    <p>{settings.temperature}</p>
                    <FontAwesomeIcon icon={faCloud} />
                  </div>
                </div>
              </div>
              <div id="simSettingsCtn" className="flex align-center">
                <button id="simSettingsBtn" onClick={popup} >
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
      settings={settings}
    />
    </div>
  );
};

export default SH_Dashboard;