// REDUX
import { useDispatch, useSelector } from "react-redux";
// ICONOS
import MultimediaIcon from "../assets/icons/MultimediaIcon";
import PrivacyIcon from "../assets/icons/PrivacyIncon";
import ScheduleIcon from "../assets/icons/ScheduleIcon";
import TrashIcon from "../assets/icons/TrashIcon";
// SLICES
import {
  clearPost,
  selectChargingStates,
  selectPostInfo,
} from "../redux/features/posts/postSlice";
import { alert } from "../redux/features/alerts/alertsSlice";
import { UserSelectIsLoggedIn } from "../redux/features/user/userSlice";
import handlerOnchange from "../utils/handlers/handlerOnchange";
import handleSubmitPost from "../utils/handlers/handlerSubmitPost";
import { getFileReference } from "../redux/features/posts/fileStore";
import { useNavigate } from "react-router-dom";
import HiddenInput from "./HiddenInput";
import IconButton from "./IconButton";

const PostOptionContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectChargingStates);
  const postInformation = useSelector(selectPostInfo);
  const isLoggedIn = useSelector(UserSelectIsLoggedIn);
  const file = getFileReference();

  return (
    /* Contenedor de botones */
    <div className="flex mt-5 w-full">
      {/* Contenedor de 2/3 para los botones de acciones */}
      <div className="flex justify-around items-center w-2/3">
        {/* Botón de multimedia */}

        <HiddenInput
          type={"file"}
          name={"multimedia"}
          id={"fileInput"}
          onChange={(e) => handlerOnchange(e, postInformation, dispatch, alert)}
        />

        <IconButton
          icon={MultimediaIcon}
          title="Multimedia"
          htmlFor="fileInput"
        />

        {/* Botón de privacidad */}
        <HiddenInput
          type={"checkbox"}
          name={"privacy"}
          id={"privacy"}
          onChange={(e) => handlerOnchange(e, postInformation, dispatch, alert)}
        />

        <IconButton
          icon={PrivacyIcon}
          title={
            !postInformation.privacy
              ? "Post Publico toca para que sea privado"
              : "Post Privado toca para que sea publico"
          }
          htmlFor="privacy"
        />

        {/* Botón de programar */}
        <HiddenInput
          type={"time"}
          name={"schedule"}
          id={"schedule"}
          // onChange={(e) => handlerOnchange(e, postInformation, dispatch, alert)}
        />
        <IconButton
          icon={ScheduleIcon}
          title={"Programa un post"}
          htmlFor={"schedule"}
        />

        {/* Botón de descartar */}
        <IconButton
          icon={TrashIcon}
          title="Descartar"
          onClick={() => dispatch(clearPost())}
        />
      </div>

      {/* Contenedor de 1/3 para el botón "Publicar" con línea divisoria */}
      <div className="flex justify-center items-center w-1/3 border-l-4 border-gray-200">
        <button
          title={`${
            isLoggedIn && !postInformation.text.trim().length
              ? "no puedes crear un post vacio"
              : !isLoggedIn
              ? "debes estar logueado para poder hacer un post"
              : "crea un nuevo post "
          }`}
          disabled={!isLoggedIn || !postInformation.text.trim().length}
          onClick={() =>
            handleSubmitPost(postInformation, file, dispatch, alert, navigate)
          }
          className={`h-10 w-24 rounded-full ${
            !isLoggedIn || !postInformation.text.trim().length
              ? "bg-slate-300  text-white cursor-not-allowed"
              : "bg-slate-200 hover:bg-gray-300"
          } `}
        >
          {isLoading ? "cargando..." : "Publicar"}
        </button>
      </div>
    </div>
  );
};

export default PostOptionContainer;
