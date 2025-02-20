import apiClient from "../apiClient";

export const loginUser = async (data) => {
    try {
        const response = await apiClient.post("/auth/login", data, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        const messageError =
        {
            type: "error",
            title: error.response.statusText,
            text: error.response.data.error
        }

        throw messageError
    }

}