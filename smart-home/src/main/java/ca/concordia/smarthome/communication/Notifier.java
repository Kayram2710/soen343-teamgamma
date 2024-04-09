package ca.concordia.smarthome.communication;

import ca.concordia.smarthome.layout.HouseComponent;

public class Notifier implements Mediator{

    private String outputLog = "";
    private int logCount = 1;

    public void output(String event, HouseComponent source){
        outputLog = outputLog+"Event "+logCount+": "+event+", at location: X="+source.getPositionX()+", Y="+source.getPositionY()+".\n";
        logCount++;
        System.out.println(outputLog);
    }

    public String getOutputLog(){
        return outputLog;
    }

}
