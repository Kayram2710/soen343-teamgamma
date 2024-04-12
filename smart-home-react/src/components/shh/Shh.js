import React, { useEffect, useState } from 'react';
import { getAllRooms, getAllZones, updateTemps, removeZone, toggleThermo, getAllWindows, setPrevTemp} from '../../api/shhApi';
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCloud,
    faGear,
    faPlay,
    faStop,
    faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faX, faClose } from "@fortawesome/free-solid-svg-icons";
import { default as api, default as axios } from '../../api/axiosConfig';


const Shh = () => {
    const [rooms, setRooms] = useState([]);
    const [zones, setZones] = useState([]);
    const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
    const [zone, setZone] = useState({
        profile: "N/A",
        location: "Room",
        temperature: 23
    });
    const [selectedRooms, setSelectedRooms] = useState([]);

    const handleOpenSettings = () => {
        setIsZoneModalOpen(true);
        console.log(isZoneModalOpen)
    };

    const handleCloseSettings = () => {
        setIsZoneModalOpen(false);
    };


    useEffect(() => {
        const observer = new MutationObserver(() => {
            if (!isZoneModalOpen) {
                fetchElements();
            }
        });

        observer.observe(document, {
            childList: true,
            subtree: true

        });
        if (!isZoneModalOpen) {
            fetchElements();
            fetchZones();
        }
        return () => {
            observer.disconnect();
        };

    }, [isZoneModalOpen]);

    useEffect(() => {
        let previousTime;
        const timerDisplay = document.getElementById('timer-display').textContent;
        const dateTimeMatch = timerDisplay.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);

        const [date, time] = dateTimeMatch[0].split(' ');

        previousTime = new Date(`${date} ${time}`);

        const observer = new MutationObserver(async () => {
            if (!isZoneModalOpen) {

                const timerDisplay = document.getElementById('timer-display').textContent;

                const dateTimeMatch = timerDisplay.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);

                const [date, time] = dateTimeMatch[0].split(' ');

                const currentTime = new Date(`${date} ${time}`);
                updateWindows();

                console.log(isZoneModalOpen);
                if (previousTime && (currentTime - previousTime) / (1000 * 60) >= 1) {
                    setPrevTemp();
                }

                if (previousTime && (currentTime - previousTime) / (1000 * 60) >= 15) {
                    updateTemps();
                    fetchZones();
                    updateWindows();
                    previousTime = currentTime;
                }
            }
        });

        observer.observe(document.getElementById('timer-display'), {
            characterData: true,
            subtree: true
        });
        return () => {
            observer.disconnect();
        };
    }, [isZoneModalOpen]);

    const fetchElements = async () => {
        setRooms(await getAllRooms());
    };

    const fetchZones = async () => {
        setZones(await getAllZones());
    };
    const updateWindows = async () => {
        const windows = await getAllWindows();
        let obscured = false;
        windows.forEach(window => {
            const element = document.getElementById(window.id);
            console.log(element.getAttribute('isClosed'));
            if (element.getAttribute('isClosed') === 'true') {
                if (window.isObstructed) {
                    obscured = true;
                } else {
                    console.log(window.id)
                    element.setAttribute('isClosed', 'false');
                    const currentTransform = element.style.transform;
                    const match = /rotate\(([-\d]+)deg\)/.exec(currentTransform);
                    const currentRotation = match ? parseInt(match[1]) : 0;
                    var newRotation = 0;
                    if (currentRotation == 45) {
                        newRotation = currentRotation - 45;
                    } else if (currentRotation == -45) {
                        newRotation = currentRotation + 44;
                    } else if (currentRotation == 0) {
                        newRotation = currentRotation + 45;
                    } else {
                        newRotation = currentRotation - 44;
                    }
                    element.style.transform = `rotate(${newRotation}deg)`;
                }
            }
        });
        if (obscured) {
            // alert("One or more windows were not able to open!");
            //TODO
        }
    }
    const onRemove = async (name) => {
        await removeZone(name);
        await fetchZones();
        await fetchElements();
    };
    const handleRoomSelection = (e) => {
        const options = e.target.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }
        setSelectedRooms(selectedValues);
    };
    const createZone = async () => {
        const formData = new FormData(document.getElementById('zoneForm'));

        const rooms = [];
        for (const value of formData.getAll('rooms')) {
            rooms.push(value.toString());
        }
        const name = formData.get('zoneName');
        const goalTemp = formData.get('goalTemperature');
        const currentTemp = formData.get('currentTemperature');
        const outsideTempString = document.getElementById('outdoorTemp').textContent;
        const outsideTemp = parseFloat(outsideTempString.match(/-?\d+/)[0]);
        console.log(outsideTemp);

        try {
            const response = await axios.post('/api/v1/sshmodule/createzone', {
                rooms: rooms,
                name: name,
                goalTemp: parseInt(goalTemp),
                currentTemp: parseInt(currentTemp),
                outsideTemp: parseInt(outsideTemp)
            });

            if (response.status === 200) {
                console.log('Zone created successfully');
            } else {
                console.error('Failed to create zone');
            }
        } catch (error) {
            console.error('Error creating zone:', error);
        }

        setIsZoneModalOpen(false);
    };

    const toggleHeating = async (zoneName) => {
        await toggleThermo(zoneName);
        await fetchZones();
    }

    const ZoneModal = ({ isOpen, settings }) => {
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
                    <h2>Zone Parameters</h2>
                    <form id="zoneForm">
                        <label>
                            Zone Name:
                            <input
                                type="text"
                                name="zoneName"
                            />
                        </label>
                        <label>
                            Select room(s):
                            <select
                                name="rooms"
                                multiple={true}
                                value={selectedRooms}
                                onChange={handleRoomSelection}
                            >
                                {rooms.map((room, index) => (
                                    <option key={index} value={room.name}>{room.name}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Current temperature:
                            <input
                                type="number"
                                name="currentTemperature"
                            />
                        </label>
                        <label>
                            Goal temperature:
                            <input
                                type="number"
                                name="goalTemperature"
                            />
                        </label>
                        <button type="button" id="simParam" onClick={createZone}>
                            Set Parameters{" "}
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div id="shc-content">
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Zone</th>
                        <th>Name</th>
                        <th>Room(s)</th>
                        <th>Temperature</th>
                        <th>Goal</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {zones.map((zone, index) => (
                        <tr class="border-b border-gray-200 dark:border-gray-700" key={`zone-${index}`}>
                            <td class="px-2 py-1" style={{ textAlign: 'center' }}>{index + 1}</td>
                            <td class="px-2 py-1" style={{ textAlign: 'center' }}>
                                {zone.name}
                            </td>
                            <td class="px-2 py-1" style={{ textAlign: 'center' }}>
                                {zone.rooms.map((room, roomIndex) => (
                                    <span key={`room-${roomIndex}`}>
                                        {room.name}
                                        {roomIndex !== zone.rooms.length - 1 && ", "}
                                    </span>
                                ))}
                            </td>
                            <td class="px-2 py-1" style={{ textAlign: 'center' }}>
                                {zone.thermostat.currentTemp}˚C

                            </td>
                            <td class="px-2 py-1" style={{ textAlign: 'center' }}>
                                {zone.thermostat.goalTemp}˚C

                            </td>
                            <td class="px-2 py-1" style={{ textAlign: 'center' }}>
                                {zone.thermostat.isHeatingOn ? (
                                    <span onClick={() => toggleHeating(zone.name)} style={{ color: 'red' }}>Heating</span>
                                ) : zone.thermostat.isCoolingOn ? (
                                    <span onClick={() => toggleHeating(zone.name)} style={{ color: 'blue' }}>Cooling</span>
                                ) : (
                                    <span onClick={() => toggleHeating(zone.name)} >Off</span>
                                )}
                            </td>
                            <td class="px-2 py-1" style={{ textAlign: 'center' }}>
                                <Button size="sm" color="red" onClick={() => onRemove(zone.name)}>Remove</Button>
                            </td>

                        </tr>
                    ))}
                    <tr class="border-gray-200 dark:border-gray-700">
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td class="px-2 py-1" style={{ textAlign: 'center' }}>
                            <Button size="sm" color="green" onClick={() => handleOpenSettings()} >Add</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <br></br>
            <br></br>
            {<ZoneModal isOpen={isZoneModalOpen} zone={zone} />}
        </div>

    );
};

export default Shh;