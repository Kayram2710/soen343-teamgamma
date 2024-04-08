package ca.concordia.smarthome.layout;

import java.util.Timer;
import java.util.TimerTask;

public class Thermostat {
    private int currentTemp;
    private int goalTemp;
    private int outsideTemp;

    private boolean isHeatingOn;
    private boolean isCoolingOn;

    private Timer temperatureAdjustmentTimer;

    public Thermostat() {
        isHeatingOn = false;
        isCoolingOn = false;
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
        stopTemperatureAdjustment();
        startTemperatureAdjustmentTimer();
        this.isCoolingOn = true;
        this.isHeatingOn = false;
    }

    public void turnOffCooling() {
        stopTemperatureAdjustment();
        this.isCoolingOn = false;
    }

    public void turnOnHeating() {
        stopTemperatureAdjustment();
        startTemperatureAdjustmentTimer();
        this.isCoolingOn = false;
        this.isHeatingOn = true;
    }

    public void turnOffHeating() {
        stopTemperatureAdjustment();
        this.isHeatingOn = false;
    }

    private void updateTemperature() {
        if (isHeatingOn && currentTemp < goalTemp) {
            currentTemp++;
        } else if (isCoolingOn && currentTemp > goalTemp) {
            currentTemp--;
        }

        System.out.println("Current Temperature: " + currentTemp);
    }

    private void startTemperatureAdjustmentTimer() {
        temperatureAdjustmentTimer = new Timer();
        temperatureAdjustmentTimer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                updateTemperature();
            }
        }, 0, 15 * 60 * 1000); // Adjust temperature every 15 minutes
    }

    public void stopTemperatureAdjustment() {
        if (temperatureAdjustmentTimer != null) {
            temperatureAdjustmentTimer.cancel();
            temperatureAdjustmentTimer = null;
        }
    }
}
