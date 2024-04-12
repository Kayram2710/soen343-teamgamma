package ca.concordia.smarthome.layout;

import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class zoneTest {


    House house;
    Zone zone;

    @Before
    public void setup(){ 
        house = House.getInstance();
        zone = new Zone("test");
        house.addZone(zone);
    }

    @After
    public void cleanup(){
        House.reset();
    }
        
    @Test
    public void testCreates() {

        Room room = new Room(0, 0, 0, 0, zone, house.getMediator());

        assertEquals(house.getFirstZone(),room.getZone());
    }


}
