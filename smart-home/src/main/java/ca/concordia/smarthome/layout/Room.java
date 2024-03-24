package ca.concordia.smarthome.layout;

public class Room extends HouseComponent{
    int width;
    int height;
    int temperature;

    Zone zone;

    public Room(int positionX, int positionY, int width, int height, Zone zone) {
        super(positionX, positionY);
        this.width = width;
        this.height = height;
        this.zone = zone;
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
}