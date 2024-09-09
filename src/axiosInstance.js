import axios from "axios";
var axiosInstance = axios.create({
    baseURL: process.env.GO_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
export default axiosInstance;
