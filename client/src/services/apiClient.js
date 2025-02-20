import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Necesario si usas cookies
});
export default apiClient