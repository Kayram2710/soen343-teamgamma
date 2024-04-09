import { default as axios } from '../../api/axiosConfig';

//Check the java terminal for the output as your testing the app (its already setup, just look at it while your testing for help)

//Call this to get a message output from the mediator which is storing important notifications 
export const getOutput = async () => {
  try {
    const response = await axios.get(`api/v1/shp/notification/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting outputlog:", error);
    throw error;
  }
};

//Call this to get the lastest event stored in the mediator
export const getLatestOutput = async () => {
  try {
    const response = await axios.get(`api/v1/shp/LatestEvent/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting outputlog:", error);
    throw error;
  }
};

//call this function to add a motion sensor at the given position
//Have some form of error handling on the front end to make sure it falls in a proper position if you can
//it will return the new sensor feel free to do with that as you will
export const addMotionSensor = async (positionX, positionY) => {
    try {
      const response = await axios.get(`api/v1/shp/addMotion/`+positionX+'/'+positionY);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding sensor:", error);
      throw error;
    }
};

//Call this to function to trigger a sensor
export const triggerSensor = async (id) => {
    try {
      const response = await axios.get(`api/v1/shp/triggerSensor/`+id);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error triggering sensor:", error);
      throw error;
    }
};

//Call this to get a list of all sensors, do with that as you will
export const getAllSensors = async () => {
    try {
      const response = await axios.get(`api/v1/shp/getAllSensors`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error triggering sensor:", error);
      throw error;
    }
};

//Call this function to trigger an alert (to the authorities) after a set amount of seconds pass
//This alert will be sent to the mediator and will be the latest event, you can retrieve it with one of the first two functions
export const triggerAlert = async (seconds) => {
    try {
      const response = await axios.get(`api/v1/shp/sendAlert/`+seconds);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error triggering sensor:", error);
      throw error;
    }
};

  

