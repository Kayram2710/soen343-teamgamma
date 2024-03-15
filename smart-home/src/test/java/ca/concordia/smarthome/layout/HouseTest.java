package ca.concordia.smarthome.layout;

import org.junit.Test;

import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.Before;    
    
public class HouseTest {

    @Before
    public void setup(){ 
        
    }
        
    @Test
    public void test() {

        House house  = House.getInstance();
        assertNotNull(house);
        
    }
}
    