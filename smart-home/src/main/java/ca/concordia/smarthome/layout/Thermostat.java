package ca.concordia.smarthome.layout;

import java.util.Timer;
import java.util.TimerTask;

public class Thermostat {
    private int currentTemp;
    private int goalTemp;
    private int outsideTemp;

    private boolean isHeatingOn;
    private boolean isCoolingOn;

    public Thermostat() {
        isHeatingOn = false;
        isCoolingOn = false;
    }

    public boolean isIsHeatingOn() {
        return this.isHeatingOn;
    }

    public boolean getIsHeatingOn() {
        return this.isHeatingOn;
    }

    public void setIsHeatingOn(boolean isHeatingOn) {
        this.isHeatingOn = isHeatingOn;
    }

    public boolean isIsCoolingOn() {
        return this.isCoolingOn;
    }

    public boolean getIsCoolingOn() {
        return this.isCoolingOn;
    }

    public void setIsCoolingOn(boolean isCoolingOn) {
        this.isCoolingOn = isCoolingOn;
    }

    public int getCurrentTemp() {
        return this.currentTemp;
    }

    public void setCurrentTemp(int currentTemp) {
        this.currentTemp = currentTemp;
    }

    public int getGoalTemp() {
        return this.goalTemp;
    }

    public void setGoalTemp(int goalTemp) {
        this.goalTemp = goalTemp;
    }

    public int getOutsideTemp() {
        return this.outsideTemp;
    }

    public void setOutsideTemp(int outsideTemp) {
        this.outsideTemp = outsideTemp;
    }

    public void turnOnCooling() {
        this.isCoolingOn = true;
        this.isHeatingOn = false;
    }

    public void turnOffCooling() {
        this.isCoolingOn = false;
    }

    public void turnOnHeating() {
        this.isCoolingOn = false;
        this.isHeatingOn = true;
    }

    public void turnOffHeating() {
        this.isHeatingOn = false;
    }
    public void toggle(){
        if(isHeatingOn)
            turnOffHeating();
        else if(isCoolingOn)
            turnOnCooling();
        else{
            if(currentTemp < goalTemp)
                turnOnHeating();
            else if(currentTemp > goalTemp)
                turnOnCooling();
        }
    }
    public void updateTemperature() {

        House.getInstance();
        if(House.getSeason().equalsIgnoreCase("summer")){
            if(outsideTemp < currentTemp){
                turnOffCooling();
                turnOffHeating();
                House.openAllWindows();
            }
        }else if(House.getSeason().equalsIgnoreCase("winter")){
            if(House.isHouseEmpty()){
                House.getThermostat().setGoalTemp(17);
            }
        }

        if (isHeatingOn && currentTemp < goalTemp) {
            currentTemp++;
        } else if (isCoolingOn && currentTemp > goalTemp) {
            currentTemp--;
        }else{
            turnOffCooling();
            turnOffHeating();
        }


    }
}
