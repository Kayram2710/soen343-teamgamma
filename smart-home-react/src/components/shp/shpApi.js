import { default as axios } from '../../api/axiosConfig';

//Check the java terminal for the output as your testing the app (its already setup, just look at it while your testing for help)

//Call this to get a message output from the mediator which is storing important notifications 
export const getOutput = async () => {
  try {
    const response = await axios.get(`api/v1/shp/notification`);
    return response.data;
  } catch (error) {
    console.error("Error getting outputlog:", error);
    throw error;
  }
};

//Call this to get the lastest event stored in the mediator
export const getLatestOutput = async () => {
  try {
    const response = await axios.get(`api/v1/shp/LatestEvent`);
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
      return response.data;
    } catch (error) {
      console.error("Error adding sensor:", error);
      throw error;
    }
};

//Call this to function to trigger a sensor
export const triggerSensor = async (index) => {
    try {
      const response = await axios.get(`api/v1/shp/triggerSensor/`+index);
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
      return response.data;
    } catch (error) {
      console.error("Error triggering sensor:", error);
      throw error;
    }
};

//Call this function to trigger an alert (to the authorities) after a set amount of seconds pass
//This version run a timer on the back end
//This alert will be sent to the mediator and will be the latest event, you can retrieve it with one of the first two functions
export const triggerAlertStalling = async (seconds) => {
    try {
      const response = await axios.get(`api/v1/shp/sendAlertStall/`+seconds);
      return response.data;
    } catch (error) {
      console.error("Error triggering sensor:", error);
      throw error;
    }
};

export const checkForFire = async () => {
  try {
    const response = await axios.get(`api/v1/shp/checkForFire`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error checking for fire:", error);
    throw error;
  }
};

export const checkForFireStarting = async () => {
  try {
    const response = await axios.get(`api/v1/shp/checkForStartingFire`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error checking for fire:", error);
    throw error;
  }
};

//Same as triggerAlertStalling except it does not run any timer on the back end
//In case you want to to run a timer on the front end instead
export const triggerAlert = async () => {
  try {
    const response = await axios.get(`api/v1/shp/sendAlert`);
    return response.data;
  } catch (error) {
    console.error("Error triggering sensor:", error);
    throw error;
  }
};

  

