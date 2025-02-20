import apiClient from "../apiClient"

export const singUpUsers = async (data) => {
  try {
    const response = await apiClient.post("/auth/singUp", data, {
      withCredentials: true
    });
    if (response.data) {
      return response.data;
    }
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