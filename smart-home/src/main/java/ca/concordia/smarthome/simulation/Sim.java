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
     * The Simulation will run once the set parameters is clicked.
     * It is a toggle that will keep a log of the house environment once certain parameters are passed:
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

    private Sim simulation;    

    // @GetMapping("/startSim")
    // public String startSim(){

    //     return "Test";

    // }

    // //call this command to stop simulation
    // public void stop(){

    // }

}