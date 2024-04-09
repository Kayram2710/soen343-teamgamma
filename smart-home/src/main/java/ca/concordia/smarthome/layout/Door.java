package ca.concordia.smarthome.layout;

import ca.concordia.smarthome.communication.Notifier;

public class Door extends HouseComponent{
    private int width;
    private boolean isClosed;

    public int getWidth() {
        return this.width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public boolean isIsClosed() {
        return this.isClosed;
    }

    public boolean getIsClosed() {
        return this.isClosed;
    }

    public void setIsClosed(boolean isClosed) {
        this.isClosed = isClosed;
    }

    public Door(int positionX, int positionY, Notifier mediator, int width, boolean isClosed) {
        super(positionX, positionY, mediator);
        this.width = width;
        this.isClosed = isClosed;
    }

    public void check(){
        //System.out.println("Door being checked");
        if(House.getAwayMode().getStatus()){
            super.getMediator().output("Door opened while away",this);
        }
    }

}
