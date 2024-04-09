import React, { useState, useEffect } from "react";
import "./sim.css";

const Clock = ({ isActive, speed, date, changeOutdoorTemperature }) => {
  const [seconds, setSeconds] = useState(0);
  const [prevHour, setPrevHour] = useState(-1);
  const [dateTime, setDateTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [outdoorTemperature, setOutdoorTemperature] = useState(0);
  var season = "spring";

  const datetime = new Date(date);

  useEffect(() => {
    //console.log("Clock.js: speed: ", speed);

    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000 / speed);
    } else {
      clearInterval(interval);
      setSeconds(0);
    }

    return () => clearInterval(interval);
  }, [isActive, speed]);

  useEffect(() => {
    // console.log("Current DateTime: " + dateTime);
    const month = datetime.getMonth() + 1;
    // console.log("Current Month: " + month);
    // console.log("Current Date: " + currentDate);
    // console.log("Current Hour: " + datetime.getHours());
    // console.log("Stored Hour: " + prevHour);

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

    // console.log("Current season: " + season);
    fetch(
      `http://localhost:8080/api/shh/temperature/get-outdoor-temperature/${season}/${currentDate}/${prevHour}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          //console.log("Successfully retrieved outdoor temperatures.");
          return response.json();
        }
      })
      .then((data) => {
         //console.log("Temperature: ", data.body.temperature);
        
        setOutdoorTemperature(data.body.temperature);
        changeOutdoorTemperature(data.body.temperature);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [seconds]);

  const formatTime = (totalSeconds) => {
    datetime.setTime(datetime.getTime() + totalSeconds * 1000);

    const year = datetime.getFullYear();
    const month = ("0" + (datetime.getMonth() + 1)).slice(-2); // Month is zero-indexed, so we add 1 and pad with '0'
    const day = ("0" + datetime.getDate()).slice(-2);
    const hours = ("0" + datetime.getHours()).slice(-2);
    const minutes = ("0" + datetime.getMinutes()).slice(-2);
    const seconds = ("0" + datetime.getSeconds()).slice(-2);

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const formattedDate = `${year}-${month}-${day}`;
    //setDateTime(formattedDateTime);
    if (prevHour !== datetime.getHours()) {
      //console.log("Previous Hour: " + prevHour);
      setPrevHour(datetime.getHours());
      setDateTime(formattedDateTime);
      setCurrentDate(formattedDate);
      //console.log("HOUR CHANGED!");
      //console.log("New Hour: " + datetime.getHours());
      //console.log("New DateTime: " + formattedDateTime);
    }
    return formattedDateTime;
  };

  return (
    <div>
      <div id="timer-display" className="flex align-center topCtnPadding">
        Simulation Time:
        <br />
        {formatTime(seconds)}
      </div>
    </div>
  );
};

export default Clock;
