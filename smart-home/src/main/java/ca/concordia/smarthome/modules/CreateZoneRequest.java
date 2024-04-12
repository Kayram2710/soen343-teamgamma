package ca.concordia.smarthome.modules;

public class CreateZoneRequest {
    private String[] rooms;
    private String name;
    private int goalTemp;
    private int currentTemp;
    private int outsideTemp;


    public String[] getRooms() {
        return this.rooms;
    }

    public void setRooms(String[] rooms) {
        this.rooms = rooms;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getGoalTemp() {
        return this.goalTemp;
    }

    public void setGoalTemp(int goalTemp) {
        this.goalTemp = goalTemp;
    }

    public int getCurrentTemp() {
        return this.currentTemp;
    }

    public void setCurrentTemp(int currentTemp) {
        this.currentTemp = currentTemp;
    }

    public int getOutsideTemp() {
        return this.outsideTemp;
    }

    public void setOutsideTemp(int outsideTemp) {
        this.outsideTemp = outsideTemp;
    }
    
}