package ca.concordia.smarthome.communication;

import ca.concordia.smarthome.layout.HouseComponent;

public interface Mediator {

    public void output(HouseComponent sender, String event);

}
