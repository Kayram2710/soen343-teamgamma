package ca.concordia.smarthome.modules;

import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.concordia.smarthome.layout.Door;
import ca.concordia.smarthome.layout.House;
import ca.concordia.smarthome.layout.Light;
import ca.concordia.smarthome.layout.Window;

@RestController
@RequestMapping("/api/v1/commander")
public class SHCModule {

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

    @GetMapping("/toggleLight/{id}")
    public String toggleLight(@PathVariable ObjectId id) {
        House.getInstance();
        for (Light light : House.getLights()) {
            if (light.getId().toString().equals(id.toString())) {
                light.setIsOn(!light.getIsOn());
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
