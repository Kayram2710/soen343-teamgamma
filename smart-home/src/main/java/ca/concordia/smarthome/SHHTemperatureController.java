package ca.concordia.smarthome;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/shh/temperature")
public class SHHTemperatureController {
    @Autowired
    private SHHTemperatureService shhTemperatureService;

    @GetMapping("/get-outdoor-temperatures/{season}")
    public ResponseEntity<List<SHHTemperature>> getOutdoorTemperatures(@PathVariable String season) throws IOException, RuntimeException {
        List<SHHTemperature> outdoorTemperatures = shhTemperatureService.convertCsvTemperaturesToJson(season);
        return ResponseEntity.ok(outdoorTemperatures);
    }
}
