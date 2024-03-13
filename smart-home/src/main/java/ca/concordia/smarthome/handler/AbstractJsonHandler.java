package ca.concordia.smarthome.handler;

import org.json.JSONObject;

import ca.concordia.smarthome.interfaces.JsonHandler;

public class AbstractJsonHandler implements JsonHandler{
    private JsonHandler nextHandler;

    @Override
    public void handle(JSONObject jsonObject, StringBuilder htmlBuilder) {
        if(nextHandler != null){
            this.nextHandler.handle(jsonObject, htmlBuilder);
        }
    }

    @Override
    public void setNextHandler(JsonHandler handler) {
        this.nextHandler = handler;
    }
    
}
