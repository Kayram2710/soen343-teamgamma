package ca.concordia.smarthome;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.concordia.smarthome.layout.House;

@RestController
@RequestMapping("/api/v1/commander")
public class houseLayoutCommander {


    @GetMapping("/LightT")
    public boolean toggleLightCommand(int index){
        House.toggleLights(index);
        return House.getLights().get(index).getIsOn();
    }

    @GetMapping("/DoorT")
    public boolean toggleDoorCommand(int index){
        House.toggleDoor(index);
        return House.getDoors().get(index).getIsClosed();
    }

    @GetMapping("/WindowsT")
    public boolean toggleWindowsCommand(int index){
        House.toggleWindow(index);
        return House.getWindows().get(index).getIsClosed();
    }

    @GetMapping("/WindowsO")
    public boolean obstructWindowsCommand(int index){
        House.obstructWindow(index);
        return House.getWindows().get(index).getIsObstructed();
    }



    

}
