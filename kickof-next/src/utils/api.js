import axios from "axios";
import {getItem} from "utils/storage";

const apiUrl = process.env.API_URL;

const Instance = axios.create({
    baseURL: apiUrl,
});

Instance.interceptors.request.use(
    async (config) => {
        const token = await getItem('x-token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


const Api = {
    Instance,
}

export default Api;