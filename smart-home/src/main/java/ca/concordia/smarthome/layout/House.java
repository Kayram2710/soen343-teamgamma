package ca.concordia.smarthome.layout;

import ca.concordia.smarthome.simulation.Clock;

import java.util.ArrayList;
import java.util.List;

public class House {
    private static House house;
    private List<Room> rooms = new ArrayList<Room>();
    private List<Light> lights = new ArrayList<Light>();
    private List<Door> doors = new ArrayList<Door>();
    private List<Window> windows = new ArrayList<Window>();
    private List<Zone> zones = new ArrayList<Zone>();

    //Simulation parameters
    private Clock time;
    private static boolean running;

    private House() {

    }

    public static House getInstance() {
        if (house == null) {
            synchronized (House.class) {
                if (house == null) {
                    house = new House();
                }
            }
        }
        return house;
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

    public static void reset(){
        house.rooms = new ArrayList<Room>();
        house.lights = new ArrayList<Light>();
        house.doors = new ArrayList<Door>();
        house.windows = new ArrayList<Window>();
    }

    public static void toggleLights(int index){
        Light target = house.lights.get(index);
        boolean status = target.getIsOn();

        if(status){
            house.lights.get(index).setIsOn(false);
        }
        else{
            house.lights.get(index).setIsOn(true);
        }
    }

    public static void toggleDoor(int index){
        Door target = house.doors.get(index);
        boolean status = target.getIsClosed();

        if(status){
            house.doors.get(index).setIsClosed(false);
        }
        else{
            house.doors.get(index).setIsClosed(true);
        }
    }

    public static void toggleWindow(int index){
        Window target = house.windows.get(index);
        boolean status = target.getIsClosed();

        if(status){
            house.windows.get(index).setIsClosed(false);
        }
        else{
            house.windows.get(index).setIsClosed(true);
        }
    }

    public static void obstructWindow(int index){
        Window target = house.windows.get(index);
        boolean status = target.getIsObstructed();

        if(status){
            house.windows.get(index).setIsObstructed(false);
        }
        else{
            house.windows.get(index).setIsObstructed(true);
        }
    }

    public static void addZone(Zone zone){
        house.zones.add(zone);
    }

    public static void removeZone(Zone zone){
        house.zones.remove(zone);
    }

    public static Zone getFirstZone(){
        return house.zones.get(0);
    }

    public static void startSim(){
        house.running = true;
    }

}
