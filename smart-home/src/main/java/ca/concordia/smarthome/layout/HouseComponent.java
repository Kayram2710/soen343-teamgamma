package ca.concordia.smarthome.layout;

import org.bson.types.ObjectId;

public abstract class HouseComponent {
    private ObjectId id;
    private int positionX;
    private int positionY;

    public HouseComponent(int positionX, int positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.id = new ObjectId();
    }

    public ObjectId getId() {
        return this.id;
    }
    
    public int getPositionX() {
        return this.positionX;
    }

    public void setPositionX(int positionX) {
        this.positionX = positionX;
    }

    public int getPositionY() {
        return this.positionY;
    }

    public void setPositionY(int positionY) {
        this.positionY = positionY;
    }
}
