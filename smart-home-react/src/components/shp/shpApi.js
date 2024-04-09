import { default as axios } from '../../api/axiosConfig';

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

//Call this to get the lastest even stored in the mediator
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
export const addMotionSensor = async (posx, posy) => {
    try {
      const response = await axios.get(`api/v1/shp/addMotion/`+posx+posy);
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

  

