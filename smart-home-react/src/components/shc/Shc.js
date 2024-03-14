import React, { useState, useEffect, useRef } from 'react';

const Shc = () => {
    const [doors, setDoors] = useState([]);
    const [lights, setLights] = useState([]);
    const [windows, setWindows] = useState([]);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            fetchElements();
        });

        observer.observe(document, {
            childList: true, 
            subtree: true 
            
        });

        fetchElements();

        return () => observer.disconnect();
    }, []);

    const fetchElements = () => {
        const doorElements = document.querySelectorAll('.door');
        const lightElements = document.querySelectorAll('.light');
        const windowElements = document.querySelectorAll('.window');

        setDoors(Array.from(doorElements));
        setLights(Array.from(lightElements));
        setWindows(Array.from(windowElements));
    };

    const handleToggle = (element) => {
        if (element.classList.contains('door')) {
            // Handle door toggle
            console.log('Toggle door:', element.id);
        } else if (element.classList.contains('light')) {
            // Handle light toggle
            console.log('Toggle light:', element.id);
        } else if (element.classList.contains('window')) {
            // Handle window toggle
            console.log('Toggle window:', element.id);
        }
    };
    const handleHover = (element) => {
        element.style.border = '2px solid red';
    };
    const handleLeave = (element) => {
        element.style.border = 'none';
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {doors.map((door, index) => (
                        <tr key={`door-${index}`} onMouseEnter={() => handleHover(door)} onMouseLeave={() => handleLeave(door)}>
                            <td>Door {index + 1}</td>
                            <td>
                                <button onClick={() => handleToggle(door)}>Open</button>
                                <button onClick={() => handleToggle(door)}>Close</button>
                            </td>
                        </tr>
                    ))}
                    {lights.map((light, index) => (
                        <tr key={`light-${index}`} onMouseEnter={() => handleHover(light)} onMouseLeave={() => handleLeave(light)}>
                            <td>Light {index + 1}</td>
                            <td>
                                <button onClick={() => handleToggle(light)}>On</button>
                                <button onClick={() => handleToggle(light)}>Off</button>
                            </td>
                        </tr>
                    ))}
                    {windows.map((window, index) => (
                        <tr key={`window-${index}`} onMouseEnter={() => handleHover(window)} onMouseLeave={() => handleLeave(window)}>
                            <td>Window {index + 1}</td>
                            <td>
                                <button onClick={() => handleToggle(window)}>Open</button>
                                <button onClick={() => handleToggle(window)}>Close</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Shc;