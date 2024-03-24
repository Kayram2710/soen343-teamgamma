package ca.concordia.smarthome.handler;

import org.json.JSONArray;
import org.json.JSONObject;

import ca.concordia.smarthome.layout.Door;
import ca.concordia.smarthome.layout.House;

public class DoorHandler extends AbstractJsonHandler {
    @Override
    public void handle(JSONObject roomJson, StringBuilder htmlBuilder) {
        try {
            JSONArray doors = roomJson.getJSONArray("doors");
            for (Object door : doors) {
                JSONObject doorJson = (JSONObject) door;
                int doorX = doorJson.getJSONObject("position").getInt("x");
                int doorY = doorJson.getJSONObject("position").getInt("y");
                String doorWall = doorJson.getJSONObject("position").getString("wall");
                int doorWidth = doorJson.getInt("width");
                boolean isClosed = doorJson.getBoolean("isClosed");

                Door newDoor = new Door(doorX, doorY, doorWidth, isClosed);
                House.getInstance().getDoors().add(newDoor);

                int doorRotation = 0;
                if (!isClosed) {
                    switch (doorWall.toLowerCase()) {
                        case "up":
                            doorRotation = -45;
                            break;
                        case "down":
                            doorRotation = 45;
                            break;
                        case "left":
                            doorRotation = 45;
                            break;
                        case "right":
                            doorRotation = -45;
                            break;
                    }
                }

                if (doorWall.toLowerCase().equals("left") || doorWall.toLowerCase().equals("right")) {
                    htmlBuilder.append("<div id='").append(newDoor.getId())
                            .append("' class='door' style='position: absolute; left: ").append(doorX)
                            .append("px; top: ").append(doorY).append("px; height: ").append(doorWidth)
                            .append("px; width: 5px; background-color: brown; transform-origin: 0px 0px; transform: rotate(")
                            .append(doorRotation).append("deg)'></div>");
                } else {
                    htmlBuilder.append("<div id='").append(newDoor.getId())
                            .append("' class='door' style='position: absolute; left: ").append(doorX)
                            .append("px; top: ").append(doorY).append("px; width: ").append(doorWidth)
                            .append("px; height: 5px; background-color: brown; transform-origin: 0px 0px; transform: rotate(")
                            .append(doorRotation).append("deg)'></div>");

                }
            }
            super.handle(roomJson, htmlBuilder);
        } catch (Exception e) {
            System.out.println("No Doors Found");
            super.handle(roomJson, htmlBuilder);
        }

    }
}
