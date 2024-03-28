package ca.concordia.smarthome;

import ca.concordia.smarthome.layout.HouseComponent;

public interface TemperatureEventManager {
    public void attachObserver(HouseComponent component);
    public void detachObserver(HouseComponent component);
    public void notifyObservers(boolean outsideIsCooler); // Notify observers that Tout < Tin (Summer)
}