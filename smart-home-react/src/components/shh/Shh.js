import React, { useEffect, useState } from 'react';

const Shh = () => {
    const [room, setRooms] = useState([]);

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
        const roomElements = document.querySelectorAll('.room');

        setRooms(Array.from(roomElements));
    };

    const handleHover = (element) => {
        element.style.border = '2px solid red';
    };
    const handleLeave = (element) => {
        element.style.border = '2px solid black';
    };

    return (
        <div id="shc-content">
            <table>
                <thead>
                    <tr>
                        <th>Zone</th>
                        <th>Location</th>
                        <th>Temperature</th>
                    </tr>
                </thead>
                <tbody>
                    {room.map((room, index) => (
                        <tr key={`door-${index}`} onMouseEnter={() => handleHover(room)} onMouseLeave={() => handleLeave(room)}>
                            <td>Zone {index + 1}</td>
                            <td>{room.name}</td>
                            <td>{room.temperature}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Shh;