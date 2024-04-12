package ca.concordia.smarthome.communication;

import ca.concordia.smarthome.layout.HouseComponent;
import ca.concordia.smarthome.layout.Room;

public class Notifier implements Mediator{

    private String outputLog;
    private int logCount;

    public Notifier(){
        outputLog = "";
        logCount = 1;
    }

    public void output(String event, HouseComponent source){
        if(source instanceof Room){
            outputLog = outputLog+"Event "+logCount+": "+event+", in room "+ ((Room)source).getName() +".\n";
        }else{
            outputLog = outputLog+"Event "+logCount+": "+event+", at location: X="+source.getPositionX()+", Y="+source.getPositionY()+".\n";
        }
        logCount++;
        System.out.println(outputLog);
    }

    public String getLastest(){
        String[] events = outputLog.split("\n");
        String result = events[events.length - 1];
        return result;
    }

    public void outputEvent(String event){
        outputLog = outputLog+"Event "+logCount+": "+event+".\n";
        logCount++;
        System.out.println(outputLog);
    }

    public String getOutputLog(){
        return outputLog;
    }

}
