package ca.concordia.smarthome.modules;

import ca.concordia.smarthome.layout.House;
import ca.concordia.smarthome.layout.Zone;
import ca.concordia.smarthome.layout.Room;

public class SHHModule {

    public void CreateZone(){

        Zone zone = new Zone();
        House.getInstance().addZone(zone);

    }

    public void deleteZone(Zone zone){

        for (Room room : zone.getRoom()) {
            updateRoomZone(room, House.getInstance().getFirstZone());
        }

        House.getInstance().removeZone(zone);

    }

    public void updateRoomZone(Room room, Zone zone){

        //remove room from last zone it was in
        room.getZone().removeRoom(room);

        //add room
        zone.addRoom(room);
        room.setZone(zone);

    }

}
