package ca.concordia.smarthome.layout;

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

    public Door(int positionX, int positionY, int width, boolean isClosed) {
        super(positionX, positionY);
        this.width = width;
        this.isClosed = isClosed;
    }

}
