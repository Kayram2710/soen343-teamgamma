import { default as api, default as axios } from './axiosConfig';

export const createProfile = (userEmail, profileData) => {
  return axios.post(`/api/v1/users/${userEmail}/profiles`, profileData);
};

export const deleteProfile = (userEmail, profileId) => {
  return axios.delete(`/api/v1/users/${userEmail}/profiles/${profileId}`);
};

export const getUserProfiles = async (user) => {
  try {
    const response = await axios.get(`/api/v1/users/${user.email}/profiles`);
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