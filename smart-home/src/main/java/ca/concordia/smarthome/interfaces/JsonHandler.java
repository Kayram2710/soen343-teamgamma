package ca.concordia.smarthome.interfaces;

import org.json.JSONObject;

public interface JsonHandler {
    void handle(JSONObject jsonObject, StringBuilder htmlBuilder);
    void setNextHandler(JsonHandler handler);
}
