package ca.concordia.smarthome.simulation;
import java.time.LocalTime;

public class Clock {
    private boolean running;
    private LocalTime time;
    private int speed;
    
    public Clock(LocalTime time) {
        this.time = time;
        this.running = true;
        this.speed = 60;
        startClock();
    }

    // Method to start the clock
    private void startClock() {
        Thread thread = new Thread(() -> {
            while (running) {
                time.plusSeconds(speed);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        thread.start();
    }

    // Method to stop the clock
    public void stopClock() {
        this.running = false;
    }

    public LocalTime getTime(){
        return time;
    }
}