
import apiClient from "../apiClient";
import showAlert from "../../utils/sweetAlertConfig"

 // cambiar aca  en el logiin y logout el lugar donde mostrar el alert este archivo solo se deberia de encargar de buscar y retorna la informacion del back end no es su responsabilidad mostrar un alert en base a lo que trajo eso deberia de mostrarlo el componente 

export const userLogOut = async () => {
    try {
        const response = await apiClient.post("/auth/logout", { withCredentials: true });
        if (response.data) {
            showAlert("success", response.statusText, response.data.message)
        }

    } catch (error) {
        console.error(error)
        showAlert("error", error?.statusText, error?.response?.data?.error)
    }
}