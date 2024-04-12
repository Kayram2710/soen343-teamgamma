package ca.concordia.smarthome.modules;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.concordia.smarthome.layout.House;
import ca.concordia.smarthome.layout.Zone;
import ca.concordia.smarthome.layout.Room;
import ca.concordia.smarthome.layout.Thermostat;
import ca.concordia.smarthome.layout.Window;

@RestController
@RequestMapping("/api/v1/sshmodule")
public class SHHModule {

    @GetMapping("/rooms")
    public List<Room> getRooms(){
        House.getInstance();
        return House.getRooms();
    }

    @GetMapping("/windows")
    public List<Window> getWindows(){
        House.getInstance();
        return House.getWindows();
    }

    @GetMapping("/zones")
    public List<Zone> getZones(){
        House.getInstance();
        return House.getZones();
    }

    @PostMapping("/createzone")
    public void createZone(@RequestBody CreateZoneRequest request) {
        House.getInstance();
        Thermostat thermostat = new Thermostat();
        thermostat.setCurrentTemp(request.getCurrentTemp());
        thermostat.setGoalTemp(request.getGoalTemp());
        thermostat.setOutsideTemp(request.getOutsideTemp());
        Zone zone = new Zone(request.getName());
        zone.setThermostat(thermostat);
        for (String roomName : request.getRooms()) {
            for (Room room : House.getRooms()) {
                if (room.getName().equals(roomName)) {
                    if (room.getZone() != null) {
                        room.getZone().removeRoom(room);
                    }
                    room.setZone(zone);
                    break;
                }
            }
        }
        House.addZone(zone);
    }
    
    @GetMapping("/toggleThermo/{name}")
    public String toggleThermo(@PathVariable String name){
        House.getInstance();
        for(Zone zone : House.getZones()){
            if(zone.getName().equals(name)){
               zone.getThermostat().toggle();
                return "Success";
            }
        }
        return "Failed";
    }

    @GetMapping("/deletezone/{name}")
    public String deleteZone(@PathVariable String name){
        House.getInstance();
        for(Zone zone : House.getZones()){
            if(zone.getName().equals(name)){
                for(Room room : zone.getRoom()){
                   room.removeZone();
                }
                House.removeZone(zone);
                return "Success";
            }
        }
        return "Failed";
    }

    @GetMapping("/updateTemps")
    public void updateAllTemps(){
        House.getInstance();
        for(Zone zone : House.getZones()){
            zone.getThermostat().updateTemperature();
        }
    }

    @GetMapping("/setPrevTemps")
    public void setPrevTemp(){
        House.getInstance();
        for(Room room : House.getRooms()){
            room.setPrevTemperature(room.getZone().getThermostat().getCurrentTemp());
        }
    }
}

