package ca.concordia.smarthome.layout;

public class Room extends HouseComponent{
    int width;
    int height;
    int temperature;

    public Room(int positionX, int positionY, int width, int height) {
        super(positionX, positionY);
        this.width = width;
        this.height = height;
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
}