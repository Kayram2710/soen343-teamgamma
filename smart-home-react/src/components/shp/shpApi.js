import { default as axios } from '../../api/axiosConfig';

//Call this to get a message output from the mediator which is storing important notifications 
//(do it everytime a button is pressed while in away mode)
export const toggleWindow = async () => {
  try {
    const response = await axios.get(`api/v1/shp/notification/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting outputlog:", error);
    throw error;
  }
};