import { default as axios } from '../../api/axiosConfig';

export const toggleWindow = async (index) => {
  try {
    const response = await axios.get(`api/v1/commander/WindowsT`, index);
    return response.data;
  } catch (error) {
    console.error("Error toggling:", error);
    throw error;
  }
};

export const toggleDoor = async (index) => {
  try {
    const response = await axios.get(`api/v1/commander/DoorT`, index);
    return response.data;
  } catch (error) {
    console.error("Error toggling:", error);
    throw error;
  }
};
  
export const toggleLight = async (index) => {
  try {
    const response = await axios.get(`api/v1/commander/LightT`, index);
    return response.data;
  } catch (error) {
    console.error("Error toggling:", error);
    throw error;
  }
};