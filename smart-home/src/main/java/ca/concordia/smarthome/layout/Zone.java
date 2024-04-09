package ca.concordia.smarthome.layout;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

public class Zone {

    @JsonManagedReference
    private List<Room> rooms = new ArrayList<Room>();
    
    private Thermostat thermostat = new Thermostat();;
    private String name;

    private int static_temperature;
    private int[] period_temp = new int[3];

    public Zone() {
    }

    public Zone(String name) {
        this.name = name;
    }


    public List<Room> getRooms() {
        return this.rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }  

    public Thermostat getThermostat() {
        return this.thermostat;
    }

    public void setThermostat(Thermostat thermostat) {
        this.thermostat = thermostat;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStatic_temperature() {
        return this.static_temperature;
    }

    public void setStatic_temperature(int static_temperature) {
        this.static_temperature = static_temperature;
    }

    public int[] getPeriod_temp() {
        return this.period_temp;
    }

    public void setPeriod_temp(int[] period_temp) {
        this.period_temp = period_temp;
    }

    public Zone(List<Room> rooms){
        for (Room room : rooms) {
            this.addRoom(room);
        }
    }

    public void addRoom(Room room){
        this.rooms.add(room);
    }

    public void removeRoom(Room room){
        this.rooms.remove(room);
    }

    public List<Room> getRoom(){
        return rooms;
    }

    public void setStaticTemperature(int temperature){
        this.static_temperature = temperature;
    }

    public int getStaticTemperature(){
        return static_temperature;
    }

    public void setPeriodicTemperature(int index, int temperature){
        this.period_temp[index] = temperature;
    }

    public int getPeriodicTempeature(int index){
        if(index <= 1 && index >= 3){
            return period_temp[index];
        }
        return static_temperature;
    }

    public void cyclSetTemp(int temp){
        this.thermostat.setGoalTemp(temp);
    }

    public void updateTemp(String mode) {
        switch (mode) {
            case "period1":
                cyclSetTemp(period_temp[0]);
                break;

            case "period2":
                cyclSetTemp(period_temp[1]);
                break;

            case "period3":
                cyclSetTemp(period_temp[2]);
                break;

            default:
                cyclSetTemp(static_temperature);
                break;
        }

    }

}
