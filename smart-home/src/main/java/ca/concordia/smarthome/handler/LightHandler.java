package ca.concordia.smarthome.handler;

import org.json.JSONArray;
import org.json.JSONObject;

import ca.concordia.smarthome.layout.House;
import ca.concordia.smarthome.layout.Light;

public class LightHandler extends AbstractJsonHandler {
    @Override
        public void handle(JSONObject roomJson, StringBuilder htmlBuilder) {
            try{
                JSONArray lights = roomJson.getJSONArray("lights");
                for (Object light : lights) {
                    JSONObject lightJson = (JSONObject) light;
                    int lightX = lightJson.getJSONObject("position").getInt("x");
                    int lightY = lightJson.getJSONObject("position").getInt("y");
                    boolean isOn = lightJson.getBoolean("isOn");
                    
                    Light newLight = new Light(lightX, lightY,House.getInstance().getMediator() , isOn);
                    House.getInstance().getLights().add(newLight);
    
                    htmlBuilder.append("<div id='").append(newLight.getId()).append("' class='light' style='position: absolute; left: ").append(lightX).append("px; top: ").append(lightY).append("px; width: 10px; height: 10px; background-color: yellow; border-radius: 50%;'></div>");
                }
    
                super.handle(roomJson, htmlBuilder);
            } catch(Exception e){
                System.out.println("No Lights Found");
                super.handle(roomJson, htmlBuilder);
            }
           
        }
}
