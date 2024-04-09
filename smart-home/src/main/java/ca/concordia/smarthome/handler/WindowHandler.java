package ca.concordia.smarthome.handler;

import org.json.JSONArray;
import org.json.JSONObject;

import ca.concordia.smarthome.layout.House;
import ca.concordia.smarthome.layout.Window;

public class WindowHandler extends AbstractJsonHandler {

    @Override
    public void handle(JSONObject roomJson, StringBuilder htmlBuilder) {
        try {
            JSONArray windows = roomJson.getJSONArray("windows");
            for (Object window : windows) {
                JSONObject windowJson = (JSONObject) window;
                int windowX = windowJson.getJSONObject("position").getInt("x");
                int windowY = windowJson.getJSONObject("position").getInt("y");
                String windowWall = windowJson.getJSONObject("position").getString("wall");
                int windowWidth = windowJson.getInt("width");
                boolean isClosed = windowJson.getBoolean("isClosed");

                Window newDoor = new Window(windowX, windowY, windowWidth, isClosed, false);
                House.getInstance().getWindows().add(newDoor);

                int windowRotation = 0;
                if (!isClosed) {
                    switch (windowWall.toLowerCase()) {
                        case "up":
                            windowRotation = -45;
                            break;
                        case "down":
                            windowRotation = 45;
                            break;
                        case "left":
                            windowRotation = 45;
                            break;
                        case "right":
                            windowRotation = -45;
                            break;
                    }
                }
                if (windowWall.toLowerCase().equals("left") || windowWall.toLowerCase().equals("right")) {
                    htmlBuilder.append("<div id='").append(newDoor.getId())
                    .append("' isClosed='").append(isClosed).append("' class='window' style='position: absolute; left: ").append(windowX)
                    .append("px; top: ").append(windowY).append("px; height: ").append(windowWidth)
                    .append("px; width: 5px; background-color: gray; transform-origin: 0px 0px; transform: rotate(")
                    .append(windowRotation).append("deg)'></div>");
                }else{
                    htmlBuilder.append("<div id='").append(newDoor.getId())
                    .append("' isClosed='").append(isClosed).append("' class='window' style='position: absolute; left: ").append(windowX)
                    .append("px; top: ").append(windowY).append("px; width: ").append(windowWidth)
                    .append("px; height: 5px; background-color: gray; transform-origin: 0px 0px; transform: rotate(")
                    .append(windowRotation).append("deg)'></div>");
                }
                
            }
            super.handle(roomJson, htmlBuilder);
        }catch(Exception e){
            System.out.println("No Windows Found");
            super.handle(roomJson, htmlBuilder);
        }
        
    }
}