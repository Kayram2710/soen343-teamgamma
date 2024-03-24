import React, { useState, useEffect } from 'react';
import './sim.css';

const Clock = ({isActive, speed, date}) => {

  const [seconds, setSeconds] = useState(0);

  const datetime = new Date(date);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + speed);
      }, 1);
    } else {
      clearInterval(interval);
      setSeconds(0);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSeconds) => {

    datetime.setTime(datetime.getTime() + (totalSeconds * 1000));

    const year = datetime.getFullYear();
    const month = ('0' + (datetime.getMonth() + 1)).slice(-2); // Month is zero-indexed, so we add 1 and pad with '0'
    const day = ('0' + datetime.getDate()).slice(-2);
    const hours = ('0' + datetime.getHours()).slice(-2);
    const minutes = ('0' + datetime.getMinutes()).slice(-2);
    const seconds = ('0' + datetime.getSeconds()).slice(-2);

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
  };

  return (
    <div>
      <div id="timer-display">{formatTime(seconds)}</div>
      <div id="simDateCtn" className="flex align-center topCtnPadding">
    </div>
    </div>
  );
}

export default Clock;
