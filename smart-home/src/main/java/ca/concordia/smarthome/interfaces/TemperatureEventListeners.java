package ca.concordia.smarthome.interfaces;

import ca.concordia.smarthome.layout.Window;

public interface TemperatureEventListeners {
    String openWindow(Window window); // Returns success or error message.
    String closeWindow(Window window); // Returns success or error message.
}