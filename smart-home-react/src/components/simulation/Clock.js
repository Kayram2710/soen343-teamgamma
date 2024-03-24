import React, { useState, useEffect } from 'react';
import './sim.css';

const Clock = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const handleStartStopClick = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleResetClick = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div id="timer-display">{formatTime(seconds)}</div>
      <button onClick={handleStartStopClick}>{isActive ? 'Stop' : 'Start'}</button>
      <button onClick={handleResetClick}>Reset</button>
    </div>
  );
}

export default Clock;
