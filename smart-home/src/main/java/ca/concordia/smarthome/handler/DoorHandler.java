package ca.concordia.smarthome.handler;

import org.json.JSONArray;
import org.json.JSONObject;

import ca.concordia.smarthome.layout.Door;
import ca.concordia.smarthome.layout.House;

public class DoorHandler extends AbstractJsonHandler{
@Override
        public void handle(JSONObject roomJson, StringBuilder htmlBuilder) {
            JSONArray doors = roomJson.getJSONArray("doors");
            for (Object door : doors) {
                JSONObject doorJson = (JSONObject) door;
                int doorX = doorJson.getJSONObject("position").getInt("x");
                int doorY = doorJson.getJSONObject("position").getInt("y");
                int doorWidth = doorJson.getInt("width");

                Door newDoor = new Door(doorX, doorY, doorWidth, true);
                House.getDoors().add(newDoor);

                htmlBuilder.append("<div id='").append(newDoor.getId()).append("' class='door' style='position: absolute; left: ").append(doorX).append("px; top: ").append(doorY).append("px; width: ").append(doorWidth).append("px; height: 5px; background-color: brown;'></div>");
            }
            super.handle(roomJson, htmlBuilder);
        }
}
