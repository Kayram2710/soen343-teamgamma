package ca.concordia.smarthome;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Profile {
    @Id
    private ObjectId  id;

    public String profileName;
    public double temperature;

    public Profile() {
        // No-argument constructor
    }

    // Getters and setters
    public String getId() {
        return id != null ? id.toHexString() : null;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getProfileName() {
        return this.profileName;
    }

    public void setProfileName(String profileName) {
        this.profileName = profileName;
    }

    public double getTemperature() {
        return this.temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    // Other getters and setters...
}
