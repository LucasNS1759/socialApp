import { uploadAndSubmitPost } from "../../redux/features/posts/postSlice";

const handleSubmitPost = async (postInformation,file, dispatch,alert,navigate) => {
    try {
      const response = await dispatch(
        uploadAndSubmitPost({ file, postInformation })
      ).unwrap();
      console.log(response);
    } catch (error) {
      console.error(error);
      if (!error.success) {
        const { type, title, text } = error;
        dispatch(alert({ title, text, type }));
        navigate("/Login");
      }
    }
  };
  
  export default handleSubmitPost