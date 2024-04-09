package ca.concordia.smarthome;

import ca.concordia.smarthome.layout.Door;
import ca.concordia.smarthome.layout.House;
import ca.concordia.smarthome.layout.Window;
import org.bson.types.ObjectId;

import javax.persistence.Tuple;
import java.util.ArrayList;
import java.util.Dictionary;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class AwayMode {
    protected boolean enabled;

    public AwayMode() {
        this.enabled = false;
    };

    public boolean getAwayMode() {
        return this.enabled;
    }

    public void setAwayMode(boolean enabled) {
        this.enabled = enabled;
    }

    public List<ObjectId> closeDoors() {
        House.getInstance();
        List<ObjectId> closedDoorsIds = new ArrayList<>();

        for (Door door : House.getDoors()) {
            if (!(door.getIsClosed())) {
                door.setIsClosed(true);
                closedDoorsIds.add(door.getId());
            }
        }
        System.out.println("Doors closed");

        return closedDoorsIds;
    }
    public List<ObjectId> closeWindows() {
        House.getInstance();
        List<ObjectId> closedWindowsIds = new ArrayList<>();

        for (Window window : House.getWindows()) {
            if (!(window.getIsClosed())) {
                window.setIsClosed(true);
                closedWindowsIds.add(window.getId());
            }
        }
        System.out.println("Windows closed");

        return closedWindowsIds;
    }

    public String toString() {
        return "Away mode is " + (this.enabled ? "enabled." : "disabled.");
    }

    public boolean getStatus(){
        return enabled;
    }
}