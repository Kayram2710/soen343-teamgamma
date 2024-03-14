package ca.concordia.smarthome.layout;

public class Window extends HouseComponent {

    private int width;
    private boolean isClosed;
    private boolean isObscured;

    public Window(int positionX, int positionY, int width, boolean isClosed, boolean isObscured) {
        super(positionX, positionY);
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

    
}
