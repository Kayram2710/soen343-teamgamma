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
    public void toggleDoor(@PathVariable ObjectId id) {
        int index = 0;
        for (Door door : House.getDoors()) {
            if (door.getId().toString().equals(id.toString())) {
                House.toggleDoor(index);
            }
            index++;
        }
    }

    @GetMapping("/toggleWindow/{id}")
    public void toggleWindow(@PathVariable ObjectId id) {
        int index = 0;
        for (Window window : House.getWindows()) {
            if (window.getId().toString().equals(id.toString())) {
                House.toggleWindow(index);
            }
            index++;
        }
    }

    @GetMapping("/toggleLight/{id}")
    public void toggleLight(@PathVariable ObjectId id) {
        int index = 0;
        for (Light light : House.getLights()) {
            if (light.getId().toString().equals(id.toString())) {
                House.toggleLights(index);
            }
            index++;
        }
    }

    @GetMapping("/obstructWindow/{id}")
    public void obstructWindow(@PathVariable ObjectId id) {
        int index = 0;
        for (Window window : House.getWindows()) {
            if (window.getId().toString().equals(id.toString())) {
                House.obstructWindow(index);            
            }
            index++;
        }
    }

}
