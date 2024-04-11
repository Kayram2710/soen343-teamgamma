package ca.concordia.smarthome.layout;

import org.bson.types.ObjectId;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ca.concordia.smarthome.communication.Notifier;

public abstract class HouseComponent {
    private ObjectId id;
    private int positionX;
    private int positionY;
    public HouseComponent(){}

    @JsonIgnore
    protected Notifier mediator;

    public HouseComponent(int positionX, int positionY, Notifier mediator) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.mediator = mediator;
        this.id = new ObjectId();
    }

    public String getId() {
        return this.id.toString();
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

    public Notifier getMediator(){
        return mediator;
    }
}
