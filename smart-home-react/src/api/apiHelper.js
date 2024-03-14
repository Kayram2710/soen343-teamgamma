import { default as api, default as axios } from './axiosConfig';

export const startSim = async () => {
  try {
    const response = await axios.get(`api/v1/simulation/run`);
    console.log("success");
    return response.data;
  } catch (error) {
    console.error("Error starting simulation:", error);
    throw error;
  }
};

export const sendLayout = async (jsonData) => {
  try {
    console.log(jsonData);
    const response = await axios.get(`api/v1/simulation/saveLayout`,jsonData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving layout:", error);
    throw error;
  }
};

export const savePerm = async (userEmail, permission, profileId) =>{
  try {
    console.log(permission);
    console.log("profile id " + profileId);
    console.log("usereamil " + userEmail);
    const response = await axios.put(`/api/v1/users/${userEmail}/profiles/${profileId}/savePerms/${permission}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving permissions", error);
    throw error;
  }
};

export const createProfile = async (userEmail, profileData) => {
  try {
    const response = await axios.post(`/api/v1/users/${userEmail}/profiles`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};

export const deleteProfile = async (userEmail, profileId) => {
  try {
    const response = await axios.delete(`/api/v1/users/${userEmail}/profiles/${profileId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw error;
  }
};

export const verifyProfilePin = async (userEmail, profileId, Pin) => {
  try {
    const response = await axios.post(`/api/v1/users/${userEmail}/profiles/${profileId}/verifyPin/${Pin}`);
    return response.data;
  } catch (error) {
    console.error("Error verifying profile pin:", error);
    throw error;
  }
};


export const editProfile = async (userEmail, profileId, updatedProfileData) => {
  try {
    const response = await axios.put(`/api/v1/users/${userEmail}/profiles/${profileId}`, updatedProfileData);
    return response.data;
  } catch (error) {
    console.error("Error editing profile API HELPER:", error);
    throw error;
  }
};


export const getUserProfiles = async (userEmail) => {
  try {
    const response = await axios.get(`/api/v1/users/${userEmail}/profiles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};


export async function validateUserLoggin(user) {
    try {
        const response = await api.get("/api/v1/users/" + user.email + "/" + user.password);
        console.log(response.data);
        return response.data; 
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function validateUserRegistration(user){
    try {
        const response = await api.get("/api/v1/users/" + user.email + "/" + user.password + "/" + user.username);
        console.log(response.data);
        return response.data; 
    } catch (err) {
      console.log(err);
      throw err;
    }
}


export async function parseLayout(jsonData){
  try{
    const response = await api.get('/api/v1/Layout/parse-layout', jsonData, {
      headers: {
          'Content-Type': 'application/json'
      }
    });
    console.log('Layout parsed successfully:', response.data);
    return response.data;
  }catch (err){
    console.log(err);
    throw err;
  }
}