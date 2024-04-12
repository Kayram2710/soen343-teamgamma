import React, { useEffect } from "react";
import {checkForFire} from "./shpApi";
import { useState } from "react";
import "./AwayMode.css";

const AwayMode = ({ layoutDoors, layoutWindows, setAwayModeEnabled, awayModeEnabled }) => {
  const [doors, setDoors] = useState([]);
  const [windows, setWindows] = useState([]);
  const [fireInterval, setFireInterval] = useState(null);

  const fetchElements = () => {
    const doorElements = document.querySelectorAll(".door");
    const windowElements = document.querySelectorAll(".window");

    setDoors(Array.from(doorElements));
    setWindows(Array.from(windowElements));

    console.log("Fetched elements.");
  };

  useEffect(() => {
    fetchElements();
  }, [layoutDoors, layoutWindows]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/shp/getAwayMode", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Away mode status: ", data);
      });
    if (awayModeEnabled) {
      const intervalId = setInterval(async () => {
        let result = await checkForFire();
        if(result){
          handleAwayModeToggle();
        }
      }, 1000);
      setFireInterval(intervalId);

      console.log("Attempting to close doors and windows...");
      console.log("Doors: ", doors);
      console.log("Windows: ", windows);
      for (const door of doors) {
        console.log("Current door: ", door);
        const currentTransform = door.style.transform;
        const match = /rotate\(([-\d]+)deg\)/.exec(currentTransform);
        const currentRotation = match ? parseInt(match[1]) : 0;
        var newRotation = 0;
        if (currentRotation == 45) {
          newRotation = currentRotation - 45;
        } else if (currentRotation == -45) {
          newRotation = currentRotation + 44;
        }
        door.style.transform = `rotate(${newRotation}deg)`;
      }
      for (const window of windows) {
        const currentTransform = window.style.transform;
        const match = /rotate\(([-\d]+)deg\)/.exec(currentTransform);
        const currentRotation = match ? parseInt(match[1]) : 0;
        var newRotation = 0;
        if (currentRotation == 45) {
          newRotation = currentRotation - 45;
        } else if (currentRotation == -45) {
          newRotation = currentRotation + 44;
        }
        window.style.transform = `rotate(${newRotation}deg)`;
      }
    }else{
      clearInterval(fireInterval);
    }
  }, [awayModeEnabled]);

  const handleAwayModeToggle = async () => {
    const awayModeToggler = document.getElementById("awayModeToggler");
    const sliderCtn = document.querySelector(".sliderCtn");
    if (awayModeToggler.classList.contains("sliderBallActive")) {
      {awayModeToggler.classList.remove("sliderBallActive");
      sliderCtn.classList.remove("sliderCtnActive");}
      setAwayModeEnabled(false);
    } else {
      {awayModeToggler.classList.add("sliderBallActive");
      sliderCtn.classList.add("sliderCtnActive");}
      setAwayModeEnabled(true);
    }

    await fetch(
      `http://localhost:8080/api/v1/shp/toggleAwayMode/${awayModeToggler.classList.contains(
        "sliderBallActive"
      )}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        console.log("Away mode toggled successfully");
      } else {
        console.log("Away mode toggling failed");
      }
    });
  };

  return (
    <>
      <div className="sliderCtn">
        <div
          id="awayModeToggler"
          onClick={handleAwayModeToggle}
          className={`sliderBall ${awayModeEnabled ? 'sliderBallActive' : ''}`}
        ></div>
      </div>
    </>
  );
};

export default AwayMode;
