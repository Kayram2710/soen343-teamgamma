package ca.concordia.smarthome.simulation;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/simulation")
public class Sim {

    /*
     * The Simulation will run once the house layout is displayed.
     * It is a toggle that will simulate the house environment once certain parameters are passed:
     * 
     * Pre-Start of Simulation:
     * Profile Selection (from existing profile)
     * Set-Date and time
     * Set House location
     * Select profile permissions
     * 
     * 
     * Post-preparations:
     * Move logged-in user
     * Change simulation run time
     * Start/Stop Sim
     * Modify Date and Time
     * Modify Temp Outside Home
     * Block Windows from closing
     * 
     */

    static String layout;
    

    @GetMapping("/run")
    public String run(){

        return "Test";

    }

    @GetMapping("/saveLayout")
    public String setLayout(@RequestBody String jsonData){

        JSONObject jsonObject = new JSONObject(jsonData);

        System.out.println(jsonObject);

        return "Layout Saved";
    }

    //call this command to stop simulation
    public void stop(){

    }

}
