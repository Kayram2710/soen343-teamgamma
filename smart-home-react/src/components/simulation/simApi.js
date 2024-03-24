import { default as axios } from '../../api/axiosConfig';

export const startSim = async () => {
  try {
    const response = await axios.get(`api/v1/simulation/startSim`);
    console.log("success");
    return response.data;
  } catch (error) {
    console.error("Error starting simulation:", error);
    throw error;
  }
};