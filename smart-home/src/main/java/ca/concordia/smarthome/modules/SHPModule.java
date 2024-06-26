package ca.concordia.smarthome.modules;

import ca.concordia.smarthome.AwayMode;
import ca.concordia.smarthome.layout.House;
import ca.concordia.smarthome.layout.MotionDetector;
import ca.concordia.smarthome.layout.Room;

import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/shp")
public class SHPModule {
    // Toggle Away Mode on/off.
    @PutMapping("/toggleAwayMode/{mode}")
    public Optional<ResponseEntity<JSONObject>> toggleAwayMode(@PathVariable String mode) {
        House.getInstance();
        if (mode.equals("true")) {
            House.setAwayMode(true);

            List<String> closedDoorsIds = House.getAwayMode().closeDoors(); // Close doors and retrieve list of doors just closed.
            List<String> closedWindowsIds = House.getAwayMode().closeWindows(); // Close windows and retrieve list of windows just closed.

            System.out.println("Closed doors: " + closedDoorsIds);
            System.out.println("Closed windows: " + closedWindowsIds);

            House.awayOn();

            JSONArray jsonDoorArray = new JSONArray(closedDoorsIds);
            JSONArray jsonWindowArray = new JSONArray(closedWindowsIds);
            JSONObject houseComponentsJsonObj = new JSONObject();
            houseComponentsJsonObj.put("doors", jsonDoorArray);
            houseComponentsJsonObj.put("windows", jsonWindowArray);

            return Optional.of(ResponseEntity.ok(houseComponentsJsonObj));
        }
        else
            House.setAwayMode(false);
            House.awayOff();

        return Optional.empty();
    }
    // Get current state of Away Mode.
    @GetMapping("/getAwayMode")
    public ResponseEntity<AwayMode> getAwayMode() {
        House.getInstance();
        return ResponseEntity.ok(House.getAwayMode());
    }

    @GetMapping("/notification")
    public String getOutputLog(){
        return House.getInstance().getMediator().getOutputLog();
    }

    @GetMapping("/addMotion/{positionX}/{positionY}")
    public MotionDetector addMotionSensor(@PathVariable int positionX, @PathVariable int positionY){
        return House.getInstance().addMotionSensor(positionX,positionY);
    }

    @GetMapping("/triggerSensor/{index}")
    public void triggerSensor(@PathVariable int index){
        House.triggerMotionSensor(index);
    }

    @GetMapping("/getAllSensors")
    public List<MotionDetector> getDetectors(){
        return House.getDetectors();
    }

    @GetMapping("/LatestEvent")
    public String getLastestEvent(){
        return House.getInstance().getMediator().getLastest();
    }

    @GetMapping("/sendAlertStall/{seconds}")
    public void sendAlertStall(@PathVariable int seconds){
        try {
            Thread.sleep(seconds*1000);
            House.alertAuthortities();
        } catch (InterruptedException e) {
            System.out.println("Function Interrupted");
        }
    }

    @GetMapping("/sendAlert")
    public void sendAlert(){
        House.alertAuthortities();
    }

    @GetMapping("/checkForFire")
    public boolean checkForFire(){
        House.getInstance();
        boolean fireDetected = false;
        for(Room room : House.getRooms()){
            if(room.getZone().getThermostat().getCurrentTemp() >= 135){
                House.getMediator().output("Fire", room);
                fireDetected=true;
            }
        }
        return fireDetected;
    }

    @GetMapping("/checkForStartingFire")
    public boolean checkForStartingFire(){
        House.getInstance();
        boolean fireDetected = false;
        for(Room room : House.getRooms()){
            if(room.getZone().getThermostat().getCurrentTemp() - room.getPrevTemperature() >= 15){
                House.getMediator().output("Fire is starting", room);
                fireDetected=true;
            }
        }
        return fireDetected;
    }

}
