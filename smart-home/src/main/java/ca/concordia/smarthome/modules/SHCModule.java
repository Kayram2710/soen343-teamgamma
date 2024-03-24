package ca.concordia.smarthome.modules;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.concordia.smarthome.layout.House;

@RestController
@RequestMapping("/api/v1/commander")
public class SHCModule {


    @GetMapping("/LightT")
    public boolean toggleLightCommand(int index){
        House.getInstance().toggleLights(index);
        return House.getInstance().getLights().get(index).getIsOn();
    }

    @GetMapping("/DoorT")
    public boolean toggleDoorCommand(int index){
        House.getInstance().toggleDoor(index);
        //System.out.println(House.getDoors().get(index).getIsClosed());
        return House.getInstance().getDoors().get(index).getIsClosed();
    }

    @GetMapping("/WindowsT")
    public boolean toggleWindowsCommand(int index){
        House.getInstance().toggleWindow(index);
        return House.getInstance().getWindows().get(index).getIsClosed();
    }

    @GetMapping("/WindowsO")
    public boolean obstructWindowsCommand(int index){
        House.getInstance().obstructWindow(index);
        return House.getInstance().getWindows().get(index).getIsObstructed();
    }
    

}
