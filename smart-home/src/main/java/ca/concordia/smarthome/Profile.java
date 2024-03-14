package ca.concordia.smarthome;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Profile {
    @Id
    private ObjectId  id;

    public String profileName;
    public String HouseLocation;
    public String code;

    public String permission;

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

    public String getHouseLocation() {
        return this.HouseLocation;
    }

    public void setHouseLocation(String HouseLocation) {
        this.HouseLocation = HouseLocation;
    }
    public void setCode(String code) {
        this.code = code;
    }
    public String getCode() {
        return this.code;
    }

    // Other getters and setters...
}
