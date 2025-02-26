import TextTareaUserPost from "./TextTareaUserPost";
import PostOptionContainer from "./PostOptionContainer";
import handlerOnchange from "../utils/handlerOnchange";
import { useDispatch, useSelector } from "react-redux";
import { alert } from "../redux/features/alerts/alertsSlice";
import { clearPost,selectPostInfo,uploadAndSubmitPost} from "../redux/features/posts/postSlice";
import { getFileReference } from "../redux/features/posts/fileStore";
import { useNavigate } from "react-router-dom";
import { UserSelectIsLoggedIn } from "../redux/features/user/userSlice";

const FormPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postInformation = useSelector(selectPostInfo);
  const file = getFileReference();
  const isLoading = useSelector(
    (state) =>
      state.post.loading.uploadMultimedia ||
      state.post.loading.uploadAndSubmitPost ||
      state.post.loading.submitPost
  );
  const loadingProgress = useSelector((state) => state.post.loadingProgress);

  const isLoggedIn = useSelector(UserSelectIsLoggedIn);

  const handleSubmit = async () => {
    try {
      const response = await dispatch(
        uploadAndSubmitPost({ file, postInformation })
      ).unwrap();
       console.log(response)
    } catch (error) {
      console.error(error);
      if (!error.success) {
        const { type, title, text } = error;
        dispatch(alert({ title, text, type }));
        navigate("/Login");
      }
    }
  };

  return (
    <div className="w-2/3 container mx-auto border rounded-lg px-2 pt-5 pb-20 shadow-2xl">
      {/* Textarea */}
      <TextTareaUserPost
        value={postInformation.text}
        placeholder={"¿Qué te gustaria compartir? ..."}
        name="text"
        onchange={(e) => handlerOnchange(e, postInformation, dispatch)}
      />

      <div className="p-4 ">
        {postInformation.previewUrl && postInformation.previewType && (
          <div className="mt-4  ">
            <p>Vista previa:</p>
            {postInformation.previewType.startsWith("image") ? (
              <img
                src={postInformation.previewUrl}
                alt="Vista previa"
              className="max-h-[500px] w-full object-contain"
              />
            ) : (
              <video
                src={postInformation.previewUrl}
                controls
                 className="max-h-[500px] w-full object-contain"
              />
            )}
          </div>
        )}
      </div>

      <PostOptionContainer
        isLoggedIn={isLoggedIn}
        postInformation={postInformation}
        handleSubmit={handleSubmit}
        privacy={postInformation.privacy}
        dispatch={dispatch}
        clearPost={clearPost}
        isLoading={isLoading}
        onchange={(e) => handlerOnchange(e, postInformation, dispatch, alert)}
        // handlerClearForm={handlerClearForm}
      />

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
