import Swal from "sweetalert2";
import { hideAlert } from "../redux/features/alerts/alertsSlice";

const showAlert = (type, title, text, dispatch) => {

    Swal.fire({
        icon: type,  // 'success', 'error', etc.
        title: title,
        text: text,
    })
        .then(() => {
            if (dispatch) {
                dispatch(hideAlert())
            }

        })


}

export default showAlert