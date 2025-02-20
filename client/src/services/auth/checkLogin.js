import apiClient from "../apiClient";

export const checkIsLoggedIn = async () => {
    try {
        const response = await apiClient.get("/auth/checkLogin", { withCredentials: true });
        if (response.data) {
            return response
        }
    } catch (error) {
        console.error(error)
        throw (error.response.data)
    }
}