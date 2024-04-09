package ca.concordia.smarthome.communication;

import ca.concordia.smarthome.layout.HouseComponent;

public class Notifier implements Mediator{

    private String outputLog = "";

    public void output(HouseComponent sender, String event){
        outputLog = outputLog+event+"\n";
    }

    public String getOutputLog(){
        return outputLog;
    }

}
