package ca.concordia.smarthome.modules;

import ca.concordia.smarthome.AwayMode;
import ca.concordia.smarthome.layout.House;
import ca.concordia.smarthome.layout.MotionDetector;

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

            List<ObjectId> closedDoorsIds = House.getAwayMode().closeDoors(); // Close doors and retrieve list of doors just closed.
            List<ObjectId> closedWindowsIds = House.getAwayMode().closeWindows(); // Close windows and retrieve list of windows just closed.

            System.out.println("Closed doors: " + closedDoorsIds);
            System.out.println("Closed windows: " + closedWindowsIds);

            JSONArray jsonDoorArray = new JSONArray(closedDoorsIds);
            JSONArray jsonWindowArray = new JSONArray(closedWindowsIds);
            JSONObject houseComponentsJsonObj = new JSONObject();
            houseComponentsJsonObj.put("doors", jsonDoorArray);
            houseComponentsJsonObj.put("windows", jsonWindowArray);

            return Optional.of(ResponseEntity.ok(houseComponentsJsonObj));
        }
        else
            House.setAwayMode(false);
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

    @GetMapping("/addMotion")
    public MotionDetector addMotionSensor(int positionX, int positionY){
        return House.getInstance().addMotionSensor(positionX,positionY);
    }

    @GetMapping("/triggerSensor/{id}")
    public void triggerSensor(@PathVariable ObjectId id){
        int index = 0;
        for (MotionDetector sensor : House.getDetectors()) {
            if (sensor.getId().toString().equals(id.toString())) {
                House.triggerMotionSensor(index);            
            }
            index++;
        }
    }

    @GetMapping("/getAllSensors")
    public List<MotionDetector> getDetectors(){
        return House.getDetectors();
    }

}
