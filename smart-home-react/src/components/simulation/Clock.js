import React, { useState, useEffect } from 'react';
import './sim.css';

const Clock = ({ isActive , speed}) => {
  const [seconds, setSeconds] = useState(0);

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
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div id="timer-display">{formatTime(seconds)}</div>
    </div>
  );
}

export default Clock;
