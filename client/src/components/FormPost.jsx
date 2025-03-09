import TextTareaUserPost from "./TextTareaUserPost";
import PostOptionContainer from "./PostOptionContainer";
import {selectChargingStates,selectLoadingProgress} from "../redux/features/posts/postSlice";
import { useSelector } from "react-redux";
import FilePreview from "./FilePreview";

const FormPost = () => {
  const isLoading = useSelector(selectChargingStates);
  const loadingProgress = useSelector(selectLoadingProgress);

  return (
    <div className="w-2/3 container mx-auto border rounded-lg px-4 pt-5 pb-20 shadow-2xl ">
      {/* Textarea */}
      <TextTareaUserPost />
      {/* cuadro de pre visualizacion de multimedia */}
      <FilePreview />
      {/* Botonera de opciones del formulario  */}
      <PostOptionContainer />

      {/* Barra de progreso */}
      {isLoading && (
        <div
          style={{
            width: "100%",
            backgroundColor: "#e0e0e0",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              width: `${loadingProgress}%`,
              backgroundColor: "#76c7c0",
              height: "10px",
              borderRadius: "5px",
            }}
          ></div>
          <p>Progreso: {loadingProgress}%</p>
        </div>
      )}
    </div>
  );
};

export default FormPost;
