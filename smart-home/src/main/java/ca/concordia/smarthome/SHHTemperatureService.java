package ca.concordia.smarthome;

import org.json.CDL;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;

import org.springframework.util.ResourceUtils;

@Service
public class SHHTemperatureService {

    private final ResourceLoader resourceLoader;

    @Autowired
    public SHHTemperatureService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

  public List<SHHTemperature> convertCsvTemperaturesToJson(String season) throws IOException, RuntimeException {
        try {
            BufferedReader br;
            if (season.equals("summer")) {
                Resource resource = resourceLoader.getResource("classpath:Summer_Outdoor_Temperatures.csv");
                br = new BufferedReader(new InputStreamReader(resource.getInputStream()));
            } else if (season.equals("spring")) {
                Resource resource = resourceLoader.getResource("classpath:Outdoor_Temperatures_Winter.csv");
                br = new BufferedReader(new InputStreamReader(resource.getInputStream()));
            } else {
                throw new IllegalArgumentException("Invalid season: " + season);
            }

            String line = "";
            List<SHHTemperature> temperatureRecords = new ArrayList<>();
            br.readLine(); // Skip the header row.
            while ((line = br.readLine()) != null) {
                String[] dataRow = line.split(",");
                SHHTemperature shhTemperature = new SHHTemperature(dataRow[0], dataRow[1], Integer.parseInt(dataRow[2]));
                temperatureRecords.add(shhTemperature);
            }
            return temperatureRecords;
        }
        catch (IOException e) {
            e.printStackTrace();
            throw new IOException();
        }
    }
}
