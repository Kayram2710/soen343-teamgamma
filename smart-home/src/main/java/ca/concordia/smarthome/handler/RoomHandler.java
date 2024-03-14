package ca.concordia.smarthome.handler;

import org.json.JSONObject;

import ca.concordia.smarthome.layout.House;
import ca.concordia.smarthome.layout.Room;

public class RoomHandler extends AbstractJsonHandler{

    @Override
    public void handle(JSONObject roomJson, StringBuilder htmlBuilder) {
       try{
        String roomName = roomJson.getString("name");
        int x = roomJson.getJSONObject("position").getInt("x");
        int y = roomJson.getJSONObject("position").getInt("y");
        int width = roomJson.getJSONObject("dimensions").getInt("width");
        int height = roomJson.getJSONObject("dimensions").getInt("height");

        Room newRoom = new Room(x, y, width, height);
        House.getInstance().getRooms().add(newRoom);

        htmlBuilder.append("<div id='").append(newRoom.getId()).append("' class='room' style='position: absolute; left: ").append(x).append("px; top: ").append(y).append("px; width: ").append(width).append("px; height: ").append(height).append("px; border: 1px solid black; display: flex; justify-content: center; align-items: center;'>");
        htmlBuilder.append("<h3 style='margin: 0;'>").append(roomName).append("</h3>");

        super.handle(roomJson, htmlBuilder);

        htmlBuilder.append("</div>");
       }catch(Exception e){
        System.out.println("No Rooms found.");
        htmlBuilder.append("Invalid File");
       }
        
    }
}
