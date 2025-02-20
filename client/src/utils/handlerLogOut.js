import { logOut } from "../redux/features/user/userSlice";
import { userLogOut } from "../services/auth/logOut";

 export const handlerLogOut = async (dispatch) => {
    try {
      //ejecuto mi servicio para que mi back end me desloguee dentro de este servicio estoy mostrando el alert capaz deberia de mostrarlo en este componente  ( a revision )
      await userLogOut();
      //despacho la accion de logout y cambio el estado de mi aplicacion a false
      dispatch(logOut());
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };