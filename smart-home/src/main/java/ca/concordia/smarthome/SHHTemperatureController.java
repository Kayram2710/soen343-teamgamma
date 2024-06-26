package ca.concordia.smarthome;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ca.concordia.smarthome.layout.House;

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
    @GetMapping("/get-outdoor-temperature/{season}/{date}/{hour}")
    public Optional<ResponseEntity<SHHTemperature>> getOutdoorTemperatures(@PathVariable String season,
                                                                           @PathVariable String date, @PathVariable String hour) throws IOException, RuntimeException {

        List<SHHTemperature> outdoorTemperatures = shhTemperatureService.convertCsvTemperaturesToJson(season);
        for (SHHTemperature temperature : outdoorTemperatures) {
            if (date.equals(temperature.getDate()) && hour.equals(temperature.getTime().split(":")[0])) {
                return Optional.of(ResponseEntity.ok(temperature));
            }
        }
        return Optional.empty();
    }
}