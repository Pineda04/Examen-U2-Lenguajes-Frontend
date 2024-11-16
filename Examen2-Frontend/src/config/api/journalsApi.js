import axios from "axios";
const API_URL = 'https://localhost:7170/api';
const journalsApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type" : "application/json"
    },
});
export {
    journalsApi,
    API_URL
}