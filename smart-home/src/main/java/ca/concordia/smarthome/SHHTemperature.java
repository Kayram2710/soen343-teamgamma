package ca.concordia.smarthome;

import java.time.LocalTime;
import java.util.Date;

public class SHHTemperature {
    private String date;
    private String time;
    private int temperature;

    public SHHTemperature() {}
    public SHHTemperature(String date, String time, int temperature) {
        this.date = date;
        this.time = time;
        this.temperature = temperature;
    }
    public String getDate() {
        return this.date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public String getTime() {
        return this.time;
    }
    public void setTime(String time) {
        this.time = time;
    }
    public int getTemperature() {
        return this.temperature;
    }
    public void setTemperature(int temperature) {
        this.temperature = temperature;
    }
}