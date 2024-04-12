import { default as api, default as axios } from './axiosConfig';
export const getAllZones = async () => {
    try {
      const response = await axios.get(`/api/v1/sshmodule/zones`);
           console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching zones", error);
      throw error;
    }
  };

  export const getAllRooms = async () => {
    try {
      const response = await axios.get(`/api/v1/sshmodule/rooms`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching zones", error);
      throw error;
    }
  };

  export const getAllWindows = async () => {
    try {
      const response = await axios.get(`/api/v1/sshmodule/windows`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching windows", error);
      throw error;
    }
  };

  export const updateTemps = async () => {
    try {
      const response = await axios.get(`/api/v1/sshmodule/updateTemps`);
      return response.data;
    } catch (error) {
      console.error("Error updating temps", error);
      throw error;
    }
  }

  export const toggleThermo= async (name) => {
    try {
      const response = await axios.get(`/api/v1/sshmodule/toggleThermo/`+ name);
      return response.data;
    } catch (error) {
      console.error("Error toggling thermoeter", error);
      throw error;
    }
  }

  export const removeZone = async (name) => {
    try {
      const response = await axios.get(`/api/v1/sshmodule/deletezone/`+ name);
      return response.data;
    } catch (error) {
      console.error("Error deleting zone", error);
      throw error;
    }
  }

  export const setPrevTemp= async () => {
    try {
      const response = await axios.get(`/api/v1/sshmodule/setPrevTemps`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error setting previous Temps", error);
      throw error;
    }
  };