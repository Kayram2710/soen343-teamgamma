package ca.concordia.smarthome.layout;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import ca.concordia.smarthome.communication.Notifier;

public class Room extends HouseComponent{
    int width;
    int height;
    int prevTemp;
    boolean isRoomEmpty;
    String name;
    @JsonBackReference
    Zone zone;
    public Room(){}

    public boolean isIsRoomEmpty() {
        return this.isRoomEmpty;
    }

    public int getPrevTemperature() {
        return this.prevTemp;
    }

    public void setPrevTemperature(int temperature) {
        this.prevTemp = temperature;
    }

    public boolean getIsRoomEmpty() {
        return this.isRoomEmpty;
    }

    public void setIsRoomEmpty(boolean isRoomEmpty) {
        this.isRoomEmpty = isRoomEmpty;
    }
    public void setName(String name) {
        this.name = name;
    }
    
    public Room(int positionX, int positionY, int width, int height, Zone zone, Notifier mediator) {
        super(positionX, positionY, mediator);
        this.width = width;
        this.height = height;
        this.zone = zone;
        this.isRoomEmpty = true;
        zone.addRoom(this);
    }

    public Room(String name,int positionX, int positionY, int width, int height, Zone zone, Notifier mediator) {
        super(positionX, positionY, mediator);
        this.width = width;
        this.height = height;
        this.zone = zone;
        this.name = name;
        zone.addRoom(this);
    }

    public int getWidth() {
        return this.width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return this.height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public Zone getZone(){
        return zone;
    }

    public void setZone(Zone zone){
        this.zone = zone;
        zone.addRoom(this);
    }

    public String getName(){
        return name;
    }

    public void removeZone(){
        this.zone = null;
    }
}