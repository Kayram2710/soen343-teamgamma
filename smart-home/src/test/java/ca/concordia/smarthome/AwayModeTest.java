package ca.concordia.smarthome;

import ca.concordia.smarthome.layout.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

class AwayModeTest {

    House house;

    @BeforeEach
    public void setUp() {
        house = House.getInstance();
    }

    @AfterEach
    public void cleanup(){
        House.reset();
    }

    // Testing setting away mode on.
    @Test
    void setAwayMode() {
        AwayMode awayMode = new AwayMode();
        awayMode.setAwayMode(true);
        assertTrue(awayMode.getAwayMode());
    }

    @Test
    void closeDoors() {
        AwayMode awayMode = new AwayMode();

        List<Door> doors = House.getDoors();
        awayMode.closeDoors();
        for (Door door : doors) {
            assertTrue(door.getIsClosed());
        }
    }

    @Test
    void closeWindows() {
        AwayMode awayMode = new AwayMode();

        List<Window> windows = House.getWindows();
        awayMode.closeWindows();
        for (Window window : windows) {
            assertTrue(window.getIsClosed());
        }
    }
}