import {
  faCloud,
  faGear,
  faPlay,
  faStop,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faClose } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserProfiles,
  savePerm,
  updateTemp,
  startSim,
  stopSim,
} from "../../api/apiHelper";
import HouseLayout from "../house/HouseLayout";
import Clock from "../simulation/Clock";
import Shc from "../shc/Shc";
import Shh from "../shh/Shh";
import "./SH_Dashboard.css";
import Shp from "../shp/Shp";
import Console from "./Console";
import EventLog from "./EventLog";

const SH_Dashboard = ({ user }) => {
  // --> Variables and Use States ########################################################
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const currentTime = hours + ":" + minutes;

  const [outdoorTemperature, setOutdoorTemperature] = useState(0);
  const [indoorTemperature, setIndoorTemperature] = useState(0);
  const [simulationDate, setSimulationDate] = useState(date);
  const [simulationHour, setSimulationHour] = useState(0);
  const [awayMode, setawaymode] = useState(false);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // SET TO TRUE FOR TESTING SISAHGA !!!!
  const [permissions, setPermissions] = useState([]);
  const [settings, setSettings] = useState({
    profile: "N/A", // Set to "N/A" initially
    date: date.toLocaleString("sv").split(" ").join("T"),
    location: "Room",
    temperature: indoorTemperature,
  });

  // --> Profile selection ########################################################
  const [profiles, setProfiles] = useState([]);
  const [activeProfileId, setActiveProfileId] = useState("");

  useEffect(() => {}, [date]);

  useEffect(() => {
    if (profiles.length > 0) {
      // Select a random profile
      const randomProfileIndex = Math.floor(Math.random() * profiles.length);
      const randomProfile = profiles[randomProfileIndex];
      setActiveProfileId(randomProfile.id);
      // Optionally, save it to localStorage or handle it as needed
      localStorage.setItem("activeProfileId", randomProfile.id);
    }
  }, [profiles]);

  useEffect(() => {
    if (!user) return; // If no userId, do nothing

    getUserProfiles(user.email)
      .then((profiles) => {
        setProfiles(profiles);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      })
      .finally(() => {});
  }, [user.email]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await getUserProfiles(user.email); // Corrected to getUserProfiles
        setProfiles(response);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const activeProfile = profiles.find((p) => p.id === activeProfileId);
    console.log(activeProfile);
    setSettings((prevSettings) => ({
      ...prevSettings,
      profile: activeProfile ? activeProfile.profileName : "N/A",
    }));
  }, [profiles, activeProfileId]);

  useEffect(() => {
    var season = getSeason(settings.date);
    updateTemp(indoorTemperature, outdoorTemperature, season);
  }, [indoorTemperature, outdoorTemperature]);

  const handleProfileChange = useCallback(
    async (event) => {
      const selectedProfileId = event.target.value;
      const selectedProfile = profiles.find(
        (profile) => profile.id === selectedProfileId
      );
      try {
        // Assuming you have a method to validate the selected profil
        setActiveProfileId(selectedProfile.id);
        localStorage.setItem("activeProfileId", selectedProfile.id);
        //console.log("worked");
      } catch (error) {
        console.error("Error during profile validation:", error);
      }
    },
    [profiles]
  );

  // --> Parameters Popup Screen for Simulation ########################################################
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
      [name]: value,
    }));
    if (name == "temperature") {
      setIndoorTemperature(value);
    }
  };

  const handlePermissionsChange = async (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setPermissions(selectedOptions);
    const confirm = await savePerm(
      user.email,
      selectedOptions.toString(),
      activeProfileId
    );
    console.log(confirm.permissions);
  };

  const SettingsModal = ({ isOpen, settings }) => {
    if (!isOpen) return null;

    return (
      <div className="settingsModal">
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
                onClick={handleCloseSettings}
              />
            </button>
          </div>
          <h2>Simulation Parameters</h2>
          <form>
            <label>
              Select a profile:
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
              <input
                type="datetime-local"
                name="date"
                value={settings.date}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Set inside temperature:
              <input
                type="number"
                name="temperature"
                value={settings.temperature}
                onChange={handleInputChange}
              />
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
              <select
                name="permissions"
                value={permissions}
                onChange={handlePermissionsChange}
                multiple={true}
              >
                <option value="Parent">Parent</option>
                <option value="Child">Children</option>
                <option value="Stranger">Stranger</option>
                <option value="Guest">Guest</option>
                {/* // we'll need to dynamically adjust the options for the select element */}
              </select>
            </label>
            <button type="button" id="simParam" onClick={handleStart}>
              Set Parameters{" "}
            </button>
          </form>
        </div>
      </div>
    );
  };

  //Clock Functionalities/////////////////////////////////////////////////////////

  const [isActive, setIsActive] = useState(false);

  const [secondsPerTick, setSpeed] = useState(1);

  const handleTimeSpeed = (speed) => {
    switch (secondsPerTick) {
      case 1:
        document.getElementById("speed1").classList.remove("speedActive");
        break;
      case 5:
        document.getElementById("speed5").classList.remove("speedActive");
        break;
      case 10:
        document.getElementById("speed10").classList.remove("speedActive");
        break;
      case 100:
        document.getElementById("speed100").classList.remove("speedActive");
        break;
      case 1000:
        document.getElementById("speed1000").classList.remove("speedActive");
        break;
      default:
        break;
    }
    document.getElementById("speed" + speed).classList.add("speedActive");
    setSpeed(speed);
    //console.log("Seconds per tick: " + speed);
  };

  // --> Outdoor Temperature Setup ########################################################
  const handleOutdoorTemperatureChange = (temperature) => {
    setOutdoorTemperature(temperature);
    //console.log("Outdoor temperature in dashboard: " + temperature);
  };

  //Dashboard setup/////////////////////////////////////////////////////////////////

  const [shdControllerActiveTab, setshdControllerActiveTab] = useState("SHC");
  const navigate = useNavigate();

  const handleTabClick = (id) => {
    setshdControllerActiveTab(id);
  };

  const popup = () => {
    handleOpenSettings();
  };

  const [doors, setDoors] = useState([]);
  const [windows, setWindows] = useState([]);

  const handleStart = async () => {
    setIsActive(true);
    handleCloseSettings();

    document.getElementById("timer-display").style.display = "flex";
    document.getElementById("time-speed").style.display = "flex";
    document.getElementById("simSettingsCtn").style.visibility = "visible";
    document.getElementById("moduleControls").style.visibility = "visible";
    document.getElementById("startSimulationBtn").style.display = "none";
    document.getElementById("stopSimulationBtn").style.display = "block";
    document.getElementById("simulationCtn").style.backgroundColor =
      "var(--red)";

    var season = getSeason(settings.date);

    await startSim(indoorTemperature,outdoorTemperature);
    var doorElements = document.querySelectorAll(".door");
    setDoors(Array.from(doorElements));
    var windowElements = document.querySelectorAll(".window");
    setWindows(Array.from(windowElements));

    //await startSim();
    await updateTemp(indoorTemperature, outdoorTemperature, season);
    //console.log("started");
  };

  const handleStop = async () => {
    setIsActive(false);

    document.getElementById("timer-display").style.display = "none";
    document.getElementById("time-speed").style.display = "none";
    document.getElementById("moduleControls").style.visibility = "hidden";
    document.getElementById("simSettingsCtn").style.visibility = "hidden";
    document.getElementById("startSimulationBtn").style.display = "block";
    document.getElementById("stopSimulationBtn").style.display = "none";
    document.getElementById("simulationCtn").style.backgroundColor =
      "var(--green)";
    await stopSim();
  };

  return (
    <div className="dashboardMasterCtn flex justify-center">
      <div id="dashboardMainCtn">
        <div className="dashboardTitle" style={{ fontSize: "1.25rem" }}>
          <b>My Smart Home Dashboard</b>
        </div>

        <div id="dashboardMiddleCtn" className="grid" >
          <div id="dashboardProfileCtn" className="flex f-col justify-center" style={{ maxHeight: '700px', overflow: 'auto' }}> 
            <div
              className="p-4 flex f-col gap-2"
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
                  <p>
                    Time: <br />
                    {formattedDate} {currentTime}
                  </p>
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
                    <p id='outdoorTemp'>{outdoorTemperature}˚C</p>
                    <FontAwesomeIcon icon={faCloud} />
                  </div>
                </div>
              </div>
              <div>
                <Clock
                  isActive={isActive}
                  speed={secondsPerTick}
                  date={settings.date}
                  changeOutdoorTemperature={handleOutdoorTemperatureChange}
                />
                <div
                  id="time-speed"
                  className="flex flex-col gap-2 px-4 py-2"
                  style={{ display: "none" }}
                >
                  <p>
                    <b>Time Speed</b>
                  </p>
                  <div
                    id="timeSpeedCtn"
                    className="flex w-full justify-between align-middle"
                    style={{
                      backgroundColor: "#FFF",
                      color: "#000",
                      borderRadius: "0.25rem",
                      fontSize: "12px",
                    }}
                  >
                    <button
                      id="speed1"
                      className="flex flex-1 w-full justify-center timeSpeed speedActive"
                      style={{ borderRadius: "0.25rem 0 0 0.25rem" }}
                      onClick={() => handleTimeSpeed(1)}
                    >
                      1x
                    </button>
                    <button
                      id="speed5"
                      className="flex flex-1 w-full justify-center timeSpeed"
                      onClick={() => handleTimeSpeed(5)}
                    >
                      5x
                    </button>
                    <button
                      id="speed10"
                      className="flex flex-1 w-full justify-center timeSpeed"
                      onClick={() => handleTimeSpeed(10)}
                    >
                      10x
                    </button>
                    <button
                      id="speed100"
                      className="flex flex-1 w-full justify-center timeSpeed"
                      onClick={() => handleTimeSpeed(100)}
                    >
                      100x
                    </button>
                    <button
                      id="speed1000"
                      className="flex flex-1 w-full justify-center timeSpeed p-0"
                      style={{ borderRadius: "0 0.25rem 0.25rem 0" }}
                      onClick={() => handleTimeSpeed(1000)}
                    >
                      1000x
                    </button>
                  </div>
                </div>
              </div>
              <div id="simSettingsCtn" className="flex align-center">
                <button id="simSettingsBtn" onClick={popup}>
                  Settings &nbsp; <FontAwesomeIcon icon={faGear} />
                </button>
              </div>
            </div>
          </div>

          <HouseLayout />

          <div id="shdControllerMainContent" className="flex f-col gap-4">
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
                    handleTabClick("SHC");
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
                    handleTabClick("SHS");
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
                    handleTabClick("SHP");
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
                    handleTabClick("SHH");
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
              <div id="moduleControls" className="max-w-full">
                {/* {shdControllerActiveTab} */}
                {shdControllerActiveTab === "SHC" && <Shc />}
                {shdControllerActiveTab === "SHH" && <Shh />}
                {shdControllerActiveTab === "SHP" && <Shp shpDoors={doors} shpWindows={windows} awayModeSet={setawaymode} awayModeVar={awayMode} />}
              </div>
            </div>
          </div>
        </div>

        <div id="dashboardBottomCtn">
          <Console/><EventLog/>
        </div>
      </div>
      <SettingsModal isOpen={isSettingsModalOpen} settings={settings} />
    </div>
  );
};

function getSeason(dateString) {
  var datetime = new Date(dateString);
  var month = datetime.getMonth() + 1;
  var season = "";

  switch (month) {
    case 12:
    case 1:
    case 2:
      season = "winter";
      break;
    case 3:
    case 4:
    case 5:
      season = "spring";
      break;
    case 6:
    case 7:
    case 8:
      season = "summer";
      break;
    case 9:
    case 10:
    case 11:
      season = "fall";
      break;
  }

  return season;
}

export default SH_Dashboard;
