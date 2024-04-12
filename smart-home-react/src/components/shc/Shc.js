import React, { useState, useEffect, useRef } from "react";
import "./shc.css";
import {
  toggleWindow,
  toggleDoor,
  toggleLight,
  obstructWindow,
} from "./shcApi";

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
      subtree: true,
    });

    fetchElements();

    return () => observer.disconnect();
  }, []);

  const fetchElements = () => {
    const doorElements = document.querySelectorAll(".door");
    const lightElements = document.querySelectorAll(".light");
    const windowElements = document.querySelectorAll(".window");

    setDoors(Array.from(doorElements));
    setLights(Array.from(lightElements));
    setWindows(Array.from(windowElements));
  };
    const handleToggle = async (element) => {
        if (element.classList.contains('door')) {
            await toggleDoor(element.id);
            updateTogglingUI(element);
        } else if (element.classList.contains('light')) {
            await toggleLight(element.id);
            console.log(window.getComputedStyle(element).getPropertyValue('background-color'))
            if (element.style.backgroundColor === 'yellow') {
                element.style.backgroundColor = 'black';
            } else {
                element.style.backgroundColor = 'yellow';
            }
        } else if (element.classList.contains('window')) {
            await toggleWindow(element.id);
            if(element.getAttribute('isClosed') === 'false'){
                element.setAttribute('isClosed','true');
            }else{
                element.setAttribute('isClosed','false');
            }
            updateTogglingUI(element);
        }
    };

  const handleObstruct = async (element) => {
    await obstructWindow(element.id);
    if (element.style.backgroundColor === "gray") {
      element.style.backgroundColor = "red";
    } else {
      element.style.backgroundColor === "gray";
    }
    isWindowObstructed(element);
  };

  const handleHover = (element) => {
    element.style.border = "2px solid orange";
  };
  const handleLeave = (element) => {
    element.style.border = "none";
  };
  const isWindowObstructed = (window) => {
    console.log(window.style.backgroundColor === "red");
    return window.style.backgroundColor === "red";
  };
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ maxHeight: '500px', overflow: 'auto' }} >
      <table class="w-full text-sm text-left rtl:text-right">
        <thead class="text-xs uppercase" style={{ color: "white" }}>
          <tr>
            <th
              scope="col"
              class="px-6 py-3"
              style={{ backgroundColor: "var(--hover-blue)" }}
            >
              Type
            </th>
            <th
              scope="col"
              class="px-6 py-3"
              style={{ backgroundColor: "var(--hover-blue)" }}
            >
              Action
            </th>
            <th
              scope="col"
              class="px-6 py-3"
              style={{ backgroundColor: "var(--hover-blue)" }}
            >
              Obstruction
            </th>
          </tr>
        </thead>
        <tbody>
          {doors.map((door, index) => (
            <tr
              class="border-b border-gray-200 dark:border-gray-700"
              key={`door-${index}`}
              onMouseEnter={() => handleHover(door)}
              onMouseLeave={() => handleLeave(door)}
            >
              <td class="px-6 py-4">Door {index + 1}</td>
              <td class="px-6 py-4">
                <button
                  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={() => handleToggle(door)}
                >
                  Open/Close
                </button>
              </td>
            </tr>
          ))}
          {lights.map((light, index) => (
            <tr
              class="border-b border-gray-200 dark:border-gray-700"
              key={`light-${index}`}
              onMouseEnter={() => handleHover(light)}
              onMouseLeave={() => handleLeave(light)}
            >
              <td class="px-6 py-4">Light {index + 1}</td>
              <td class="px-6 py-4">
                <button
                  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={() => handleToggle(light)}
                >
                  Open/Close
                </button>
              </td>
            </tr>
          ))}
          {windows.map((window, index) => (
            <tr
              class="border-b border-gray-200 dark:border-gray-700"
              key={`window-${index}`}
              onMouseEnter={() => handleHover(window)}
              onMouseLeave={() => handleLeave(window)}
            >
              <td class="px-6 py-4">Window {index + 1}</td>
              <td class="px-6 py-4">
                <button
                  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={() => handleToggle(window)}
                  disabled={isWindowObstructed(window)}
                >
                  Open/Close
                </button>
              </td>
              <td class="px-6 py-4">
                <button
                  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={() => handleObstruct(window)}
                >
                  Obstruct
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
function updateTogglingUI(element) {
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
export default Shc;
