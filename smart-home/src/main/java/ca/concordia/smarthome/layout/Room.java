package ca.concordia.smarthome.layout;

public class Room extends HouseComponent{
    int width;
    int height;
    int temperature;
    boolean isRoomEmpty;
    String name;
    Zone zone;

    public int getTemperature() {
        return this.temperature;
    }

    public void setTemperature(int temperature) {
        this.temperature = temperature;
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
    
    public Room(int positionX, int positionY, int width, int height, Zone zone) {
        super(positionX, positionY);
        this.width = width;
        this.height = height;
        this.zone = zone;
        this.isRoomEmpty = true;
    }

    public Room(String name,int positionX, int positionY, int width, int height, Zone zone) {
        super(positionX, positionY);
        this.width = width;
        this.height = height;
        this.zone = zone;
        this.name = name;
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

    public int getTemp(){
        return temperature;
    }

    public void setTemp(int temp){
        this.temperature = temp;
    }

    public Zone getZone(){
        return zone;
    }

    public void setZone(Zone zone){
        this.zone = zone;
    }

    public String getName(){
        return name;
    }
}