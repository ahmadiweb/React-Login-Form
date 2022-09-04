import axios from "axios"
axios.defaults.baseURL = 'http://localhost:3001';
export const fetchToken = async (username, password) => {
    return axios.post('/login', {
        username,
        password
    }).then(response => response.data)
}

export const fetchUserData = async (token) => {
    return axios.get('/users/me', {
        headers: {
            authorization: token
        }
    }).then(response => response.data)
}