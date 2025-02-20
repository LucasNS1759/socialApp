import { useState } from "react";
import TextTareaUserPost from "./TextTareaUserPost";
import PostOptionContainer from "./PostOptionContainer";
import handlerOnchange from "../utils/handlerOnchange";
import { useDispatch } from "react-redux";
import { alert } from "../redux/features/alerts/alertsSlice";

const FormPost = () => {
  const dispatch = useDispatch();

  const [postInformation, setPostInformation] = useState({
    text: "",
    privacy: false,
    mutimedia: "",
    scheduler: null,
    previewUrl: "",
    previewType: "",
  });

  const handlerClearForm = () => {
    setPostInformation({
      text: "",
      privacy: false,
      mutimedia: "",
      scheduler: null,
      previewUrl: "",
      previewType: "",
    });
  };

  return (
    <div className="w-2/3 container mx-auto border rounded-lg px-2 pt-5 pb-20 shadow-2xl">
      {/* Textarea */}
      <TextTareaUserPost
        value={postInformation.text}
        placeholder={"¿Qué te gustaria compartir? ..."}
        name="text"
        onchange={(e) =>
          handlerOnchange(e, postInformation, setPostInformation)
        }
      />

      <div className="p-4">
        

        {postInformation.previewUrl && postInformation.previewType && (
          <div className="mt-4">
            <p>Vista previa:</p>
            {postInformation.previewType.startsWith("image") ? (
              <img
                src={postInformation.previewUrl}
                alt="Vista previa"
                className="max-w-xs border"
              />
            ) : (
              <video
                src={postInformation.previewUrl}
                controls
                className="max-w-xs border "
              />
            )}
          </div>
        )}
      </div>

      <PostOptionContainer
        privacy={postInformation.privacy}
        onchange={(e) =>
          handlerOnchange(
            e,
            postInformation,
            setPostInformation,
            dispatch,
            alert
          )
        }
        handlerClearForm={handlerClearForm}
      />
    </div>
  );
};

export default FormPost;
