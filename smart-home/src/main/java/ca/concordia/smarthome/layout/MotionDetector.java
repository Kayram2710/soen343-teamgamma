package ca.concordia.smarthome.layout;

import ca.concordia.smarthome.communication.Notifier;

public class MotionDetector extends HouseComponent{

    public MotionDetector(int positionX, int positionY, Notifier mediator){
        super(positionX, positionY, mediator);
    }

    public void trigger(){
        if(House.getAwayMode().getStatus()){
            super.getMediator().output("Motion Sensor triggered while away",this);
        }else{
            super.getMediator().output("Motion Sensor triggered",this);
        }
    }


}
