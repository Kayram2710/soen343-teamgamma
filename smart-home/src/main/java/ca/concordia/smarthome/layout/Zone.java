package ca.concordia.smarthome.layout;

import java.util.ArrayList;
import java.util.List;

public class Zone {

    private List<Room> contained_rooms = new ArrayList<Room>();

    private int static_temperature;
    private int[] period_temp = new int[3];

    public Zone(){}

    public Zone(List<Room> rooms){
        for (Room room : rooms) {
            this.addRoom(room);
        }
    }

    public void addRoom(Room room){
        this.contained_rooms.add(room);
    }

    public void removeRoom(Room room){
        this.contained_rooms.remove(room);
    }

    public List<Room> getRoom(){
        return contained_rooms;
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

    public void cycleRoomSetTemp(int temp){
        for (Room room : contained_rooms) {
            room.setTemp(temp);
        }
    }

    public void updateTemp(String mode){
        switch (mode) {
            case "period1":
                cycleRoomSetTemp(period_temp[0]);
                break;

            case "period2":
                cycleRoomSetTemp(period_temp[1]);
                break;

            case "period3":
                cycleRoomSetTemp(period_temp[2]);
                break;
        
            default:
                cycleRoomSetTemp(static_temperature);
                break;
        }

    }

}
