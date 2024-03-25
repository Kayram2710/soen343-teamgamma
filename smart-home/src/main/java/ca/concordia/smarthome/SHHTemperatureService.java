package ca.concordia.smarthome;

import org.json.CDL;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;

import org.springframework.util.ResourceUtils;

@Service
public class SHHTemperatureService {
    public List<SHHTemperature> convertCsvTemperaturesToJson(String season) throws IOException, RuntimeException {
        try {
            BufferedReader br;
            JSONArray jsonOutdoorTemperatures;
            if (season.equals("summer")) {
                br = new BufferedReader(new FileReader("src/main/resources/Summer_Outdoor_Temperatures.csv"));
            } else if (season.equals("winter")) {
                br = new BufferedReader(new FileReader("src/main/resources/Outdoor_Temperatures_Winter.csv"));
            } else {
                throw new RuntimeException("Season Invalid.");
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
            System.out.println(e);
            throw new IOException();
        }
    }
}