import axios from 'axios';
export const  axiosInstance=axios.create({
    baseURL:"https://leksvideo.herokuapp.com/api",
    withCredentials: true,
    credentials: 'include'
});
