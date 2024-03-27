import { default as axios } from '../../api/axiosConfig';

export const toggleWindow = async (id) => {
  try {
    const response = await axios.get(`api/v1/commander/toggleWindow/` + id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error toggling:", error);
    throw error;
  }
};

export const toggleDoor = async (id) => {
  try {
    const response = await axios.get(`api/v1/commander/toggleDoor/` + id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error toggling:", error);
    throw error;
  }
};

export const toggleLight = async (id) => {
  try {
    const response = await axios.get(`api/v1/commander/toggleLight/` + id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error toggling:", error);
    throw error;
  }
};

export const obstructWindow = async (id) => {
  try {
    const response = await axios.get(`api/v1/commander/obstructWindow/` + id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error toggling:", error);
    throw error;
  }
};