package ca.concordia.smarthome.layout;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.After;
import org.junit.Before;   

import java.util.ArrayList;
import java.util.List;

    
public class HouseTest {

    House house;

    @Before
    public void setup(){ 
        house = House.getInstance();
    }

    @After
    public void cleanup(){
        House.reset();
    }
        
    @Test
    public void testExists() {

        assertNotNull(house);
        
    }

    @Test
    public void fillRoom() {

        List<Room> testRooms = new ArrayList<Room>();
        Zone zone = new Zone();
        
        testRooms.add(new Room(40, 20, 10, 10, zone, house.getMediator()));
        testRooms.add(new Room(60, 20, 10, 20, zone, house.getMediator()));

        House.setRooms(testRooms);

        assertEquals(House.getRooms(), testRooms);
        
    }

    @Test
    public void fillDoor() {

        List<Door> testDoors = new ArrayList<Door>();
        
        testDoors.add(new Door(50, 20, house.getMediator(), 5, false));
        testDoors.add(new Door(30, 20, house.getMediator(), 5, true));

        House.setDoors(testDoors);

        assertEquals(House.getDoors(), testDoors);
        
    }

    
    @Test
    public void fillWindow() {

        List<Window> testWindow = new ArrayList<Window>();
        
        testWindow.add(new Window(30, 27, 5, true, false, house.getMediator()));
        testWindow.add(new Window(30, 12, 5, false, false, house.getMediator()));

        House.setWindows(testWindow);

        assertEquals(House.getWindows(), testWindow);
        
    }

    @Test
    public void fillLight() {

        List<Light> testLight = new ArrayList<Light>();
        
        testLight.add(new Light(40, 20, house.getMediator(),false));
        testLight.add(new Light(60, 20, house.getMediator(),false));

        House.setLights(testLight);

        assertEquals(House.getLights(), testLight);
        
    }

    @Test 
    public void toggleWindowTest(){
        
        //setup closed window
        List<Window> testWindow = new ArrayList<Window>();
        testWindow.add(new Window(30, 27, 5, true, false,house.getMediator()));
        House.setWindows(testWindow);

        //testing if window is open
        assertEquals(true, House.getWindows().get(0).getIsClosed());

        //toggle
        House.toggleWindow(0);

        //testing if window is closed
        assertEquals(false, House.getWindows().get(0).getIsClosed());
    }

    @Test 
    public void obstructWindowTest(){
        
        //setup obstructed window
        List<Window> testWindow = new ArrayList<Window>();
        testWindow.add(new Window(30, 27, 5, false, true,house.getMediator()));
        House.setWindows(testWindow);

        //testing if window is obstructed
        assertEquals(true, House.getWindows().get(0).getIsObstructed());

        //toggle
        House.obstructWindow(0);

        //testing if window is unobstructed
        assertEquals(false, House.getWindows().get(0).getIsObstructed());
    }

    @Test 
    public void toggleLightTest(){
        
        //setup turned off light
        List<Light> testLight = new ArrayList<Light>();
        testLight.add(new Light(40, 20,house.getMediator(),false));
        House.setLights(testLight);

        //testing if light is on
        assertEquals(false, House.getLights().get(0).getIsOn());

        //toggle
        House.toggleLights(0);

        //testing if window is closed
        assertEquals(true, House.getLights().get(0).getIsOn());
    }

    @Test 
    public void toggleDoorTest(){
        
        //setup turned off light
        List<Door> testDoor = new ArrayList<Door>();
        testDoor.add(new Door(50, 20, house.getMediator(), 5, false));
        House.setDoors(testDoor);

        //testing if light is on
        assertEquals(false, House.getDoors().get(0).getIsClosed());

        //toggle
        House.toggleDoor(0);

        //testing if window is closed
        assertEquals(true, House.getDoors().get(0).getIsClosed());
    }

}
    