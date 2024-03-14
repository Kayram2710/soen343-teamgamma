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
import { startSim } from "../../api/apiHelper";

const SH_Dashboard = (props) => {
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
                <button id="simSettingsBtn">
                  Settings &nbsp; <FontAwesomeIcon icon={faGear} />
                </button>
              </div>
            </div>
          </div>

          <div id="houseViewCtn" className="flex justify-center align-center">
            <h2>House View</h2>
          </div>

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
              {shdControllerActiveTab}
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
    </div>
  );
};

export default SH_Dashboard;
