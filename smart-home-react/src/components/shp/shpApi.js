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

//call this function to add a motion sensor at the given position
//Have some form of error handling on the front end to make sure it falls in a proper position if you can
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

//Call this to get a message output from the mediator which is storing important notifications 
export const triggerSensor = async () => {
    try {
      const response = await axios.get(`api/v1/shp/notification/`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting outputlog:", error);
      throw error;
    }
};

  

