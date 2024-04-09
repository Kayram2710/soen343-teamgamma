package ca.concordia.smarthome.layout;

import ca.concordia.smarthome.communication.Notifier;

public class MotionDetector extends HouseComponent{

    public MotionDetector(int positionX, int positionY, Notifier mediator){
        super(positionX, positionY, mediator);
    }

    public String trigger(){
        return "Motion Sensor Triggered At Location: X:"+super.getPositionX()+", Y: "+super.getPositionY()+".";
    }


}
