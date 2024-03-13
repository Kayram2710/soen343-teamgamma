package ca.concordia.smarthome.layout;

import java.util.ArrayList;
import java.util.List;

public class House {
    private static House house;
    private List<Room> rooms = new ArrayList<Room>();
    private List<Light> lights = new ArrayList<Light>();
    private List<Door> doors = new ArrayList<Door>();

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

    public static void reset(){
        house.rooms = new ArrayList<Room>();
        house.lights = new ArrayList<Light>();
        house.doors = new ArrayList<Door>();
    }

}
