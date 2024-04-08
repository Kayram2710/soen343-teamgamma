package ca.concordia.smarthome;

import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.concordia.smarthome.handler.LightHandler;
import ca.concordia.smarthome.handler.RoomHandler;
import ca.concordia.smarthome.handler.WindowHandler;
import ca.concordia.smarthome.interfaces.JsonHandler;
import ca.concordia.smarthome.layout.Door;
import ca.concordia.smarthome.layout.House;
import ca.concordia.smarthome.layout.Thermostat;
import ca.concordia.smarthome.layout.Window;
import ca.concordia.smarthome.layout.Zone;
import ca.concordia.smarthome.handler.DoorHandler;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Specify the frontend origin
@RequestMapping("/api/v1/Layout")
public class LayoutController {

    @GetMapping("/startSim")
    public String updateTemp() {
        House.getInstance();
        House.setIsRunning(true);
        return House.getSeason();
    }

    @PostMapping("/parse-layout")
    public String parseLayout(@RequestBody String jsonData) {

        Zone main_zone = new Zone();
        House.getInstance().addZone(main_zone);

        JsonHandler roomHandler = new RoomHandler();
        JsonHandler lightHandler = new LightHandler();
        JsonHandler doorHandler = new DoorHandler();
        JsonHandler windowHandler = new WindowHandler();

        roomHandler.setNextHandler(lightHandler);
        lightHandler.setNextHandler(doorHandler);
        doorHandler.setNextHandler(windowHandler);

        JSONObject jsonObject = new JSONObject(jsonData);
        JSONArray rooms = jsonObject.getJSONArray("rooms");
        StringBuilder htmlBuilder = new StringBuilder();
        for (Object room : rooms) {
            roomHandler.handle((JSONObject) room, htmlBuilder);
        }
        House.getInstance();
        return htmlBuilder.toString();
    }

    @GetMapping("/toggleDoor/{id}")
    public String toggleDoor(@PathVariable ObjectId id) {
        House.getInstance();
        for (Door door : House.getDoors()) {
            if (door.getId().toString().equals(id.toString())) {
                door.setIsClosed(!door.getIsClosed());
                return "Success";
            }
        }
        return "Failed";
    }

    @GetMapping("/toggleWindow/{id}")
    public String toggleWindow(@PathVariable ObjectId id) {
        House.getInstance();
        for (Window window : House.getWindows()) {
            if (window.getId().toString().equals(id.toString())) {
                window.setIsClosed(!window.getIsClosed());
                return "Success";
            }
        }
        return "Failed";
    }

    @GetMapping("/obstructWindow/{id}")
    public String obstructWindow(@PathVariable ObjectId id) {
        House.getInstance();
        for (Window window : House.getWindows()) {
            if (window.getId().toString().equals(id.toString())) {
                window.setIsObstructed(!window.getIsObstructed());
                return "Success";
            }
        }
        return "Failed";
    }
}
