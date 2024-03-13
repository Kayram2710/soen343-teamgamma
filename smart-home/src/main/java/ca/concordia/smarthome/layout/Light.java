package ca.concordia.smarthome.layout;

public class Light extends HouseComponent{
    private boolean isOn;

    public boolean isIsOn() {
        return this.isOn;
    }

    public boolean getIsOn() {
        return this.isOn;
    }

    public void setIsOn(boolean isOn) {
        this.isOn = isOn;
    }

    public Light(int positionX, int positionY, boolean isOn) {
        super(positionX, positionY);
        this.isOn = isOn;
    }

}
