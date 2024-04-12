package ca.concordia.smarthome;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.concordia.smarthome.layout.House;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Specify the frontend origin
@RequestMapping("/api/v1/simulation")
public class SimulationController {

    @GetMapping("/startSim/{indoorTemp}/{outdoorTemp}")
    public String startSim(@PathVariable int indoorTemp, @PathVariable int outdoorTemp) {
        House.getInstance();
        House.setIsRunning(true);
        House.getFirstZone().getThermostat().setCurrentTemp(indoorTemp);
        House.getFirstZone().getThermostat().setGoalTemp(22);
        if (22 > indoorTemp) {
            House.getFirstZone().getThermostat().turnOnHeating();
        } else {
            House.getFirstZone().getThermostat().turnOnCooling();
        }
        return "Success";
    }

    @GetMapping("/stopSim")
    public String updateTemp() {
        House.getInstance();
        House.setIsRunning(false);
        return "Success";
    }

    @GetMapping("/updateTemp/{indoorTemp}/{outdoorTemp}/{season}")
    public String updateTemp(@PathVariable int indoorTemp, @PathVariable int outdoorTemp, @PathVariable String season) {
        House.getInstance();
        House.getThermostat().setCurrentTemp(indoorTemp);
        House.getThermostat().setOutsideTemp(outdoorTemp);
        House.setSeason(season);

        return "Success";
    }
}
