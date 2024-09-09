import axios from "axios";
const axiosInstance = axios.create({
    baseURL: process.env.GO_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});
export default axiosInstance;
//# sourceMappingURL=axiosInstance.js.map