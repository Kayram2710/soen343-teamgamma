package ca.concordia.smarthome.layout;

import ca.concordia.smarthome.AwayMode;
import ca.concordia.smarthome.communication.Notifier;

import java.util.ArrayList;
import java.util.List;

public class House {
    private static House house;
    private Notifier mediator;
    private List<Room> rooms = new ArrayList<Room>();
    private List<Light> lights = new ArrayList<Light>();
    private List<Door> doors = new ArrayList<Door>();
    private List<Window> windows = new ArrayList<Window>();
    private List<Zone> zones = new ArrayList<Zone>();
    private List<MotionDetector> sensors = new ArrayList<MotionDetector>();
    private Thermostat thermostat = new Thermostat();
    private AwayMode awayMode = new AwayMode();

    // Simulation parameters
    private boolean isRunning;
    private String season;

    private House() {
        mediator = new Notifier();
    }

    public static House getInstance() {
        if (house == null) {
            synchronized (House.class) {
                if (house == null) {
                    house = new House();
                    house.isRunning = false;
                }
            }
        }
        return house;
    }

    public static void setAwayMode(boolean enabled) {
        house.awayMode.setAwayMode(enabled);
    }
    public static AwayMode getAwayMode() { return house.awayMode; }

    public static Thermostat getThermostat(){
        return house.thermostat;
    }

    public static void setThermostat(Thermostat thermostat){
        house.thermostat = thermostat;
    }

    public static String getSeason() {
        return house.season;
    }

    public static void setSeason(String season) {
        house.season = season;
    }

    public static boolean isRunning() {
        return house.isRunning;
    }

    public static void setIsRunning(boolean isRunning) {
        house.isRunning = isRunning;
    }

    public static List<Room> getRooms() {
        return house.rooms;
    }

    public static void setRooms(List<Room> rooms) {
        house.rooms = rooms;
    }

    public static List<Light> getLights() {
        return house.lights;
    }

    public static void setLights(List<Light> lights) {
        house.lights = lights;
    }

    public static List<Door> getDoors() {
        return house.doors;
    }

    public static void setDoors(List<Door> doors) {
        house.doors = doors;
    }

    public static List<Window> getWindows() {
        return house.windows;
    }

    public static void setWindows(List<Window> windows) {
        house.windows = windows;
    }

    public static void reset() {
        house.rooms = new ArrayList<Room>();
        house.lights = new ArrayList<Light>();
        house.doors = new ArrayList<Door>();
        house.windows = new ArrayList<Window>();
    }

    public static void toggleLights(int index) {
        Light target = house.lights.get(index);
        boolean status = target.getIsOn();

        if (status) {
            house.lights.get(index).setIsOn(false);
        } else {
            house.lights.get(index).setIsOn(true);
        }
    }

    public MotionDetector addMotionSensor(int positionX, int positionY){
        MotionDetector newSensor = new MotionDetector(positionX, positionY,this.mediator);
        sensors.add(newSensor);

        return newSensor;
    }

    public static void triggerMotionSensor(int index) {
        MotionDetector target = house.sensors.get(index);
        target.trigger();
    }

    public static List<MotionDetector> getDetectors(){
        return house.sensors;
    }

    public Notifier getMediator(){
        return mediator;
    }

    public static void toggleDoor(int index) {
        Door target = house.doors.get(index);
        boolean status = target.getIsClosed();

        if (status) {
            house.doors.get(index).setIsClosed(false);
            target.check();
        } else {
            house.doors.get(index).setIsClosed(true);
        }
    }

    public static void toggleWindow(int index) {
        Window target = house.windows.get(index);
        boolean status = target.getIsClosed();

        if (status) {
            house.windows.get(index).setIsClosed(false);
            target.check();
        } else {
            house.windows.get(index).setIsClosed(true);
        }
    }

    public static void obstructWindow(int index) {
        Window target = house.windows.get(index);
        boolean status = target.getIsObstructed();

        if (status) {
            house.windows.get(index).setIsObstructed(false);
        } else {
            house.windows.get(index).setIsObstructed(true);
        }
    }

    public static void addZone(Zone zone) {
        house.zones.add(zone);
    }

    public static void removeZone(Zone zone) {
        house.zones.remove(zone);
    }

    public static Zone getFirstZone() {
        return house.zones.get(0);
    }

    public static boolean isHouseEmpty(){
        for(Room room : house.rooms){
            if(!room.isRoomEmpty){
                return false;
            }
        }
        return true;
    }

    public static void awayOn(){
        house.mediator.outputEvent("AwayMode turned on, all windows and doors closed");
    }

    public static void awayOff(){
        house.mediator.outputEvent("AwayMode turned off");
    }

    public static void alertAuthortities(){
        house.mediator.outputEvent("Authorities Alerted");
    }
}

