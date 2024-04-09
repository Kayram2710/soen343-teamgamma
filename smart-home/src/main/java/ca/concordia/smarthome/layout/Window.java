package ca.concordia.smarthome.layout;

import ca.concordia.smarthome.communication.Notifier;

public class Window extends HouseComponent {

    private int width;
    private boolean isClosed;
    private boolean isObscured;

    public Window(int positionX, int positionY, int width, boolean isClosed, boolean isObscured, Notifier mediator) {
        super(positionX, positionY, mediator);
        this.width = width;
        this.isClosed = isClosed;
        this.isObscured = isObscured;
    }

    public int getWidth() {
        return this.width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public boolean getIsClosed() {
        return this.isClosed;
    }

    public void setIsClosed(boolean isClosed) {
        this.isClosed = isClosed;
    }

    public boolean getIsObstructed() {
        return this.isObscured;
    }

    public void setIsObstructed(boolean isObstructed) {
        this.isObscured = isObstructed;
    }

    public void check(){
        if(House.getAwayMode().getStatus()){
            super.getMediator().output("Window opened while away",this);
        }
    }

    
}
