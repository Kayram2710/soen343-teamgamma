import api from './axiosConfig';

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
