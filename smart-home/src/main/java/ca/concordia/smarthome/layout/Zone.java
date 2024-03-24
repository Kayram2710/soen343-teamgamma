package ca.concordia.smarthome.layout;

import java.util.ArrayList;
import java.util.List;

public class Zone {

    private List<Room> contained_rooms = new ArrayList<Room>();


    boolean periodical = false;
    private int main_temperature;

    private int period1_temp;
    private int period2_temp;
    private int period3_temp;

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

    public void setTemp(int temperature){
        this.main_temperature = temperature;
    }

    public void setAltTemp1(int temperature){
        this.period1_temp = temperature;
    }

    public void setAltTemp2(int temperature){
        this.period2_temp = temperature;
    }

    public void setAltTemp3(int temperature){
        this.period3_temp = temperature;
    }

    public void cycleRoomSetTemp(int temp){
        for (Room room : contained_rooms) {
            room.setTemp(temp);
        }
    }

}
