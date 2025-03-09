import { useDispatch, useSelector } from "react-redux";
import { removeFormImage, selectPostInfo } from "../redux/features/posts/postSlice";

const FilePreview = () => {
  const postInformation = useSelector(selectPostInfo);
  const dispatch = useDispatch()
  return (
    <div className="mx-auto px-auto  ">
      {postInformation.previewUrl && postInformation.previewType && (
        <div className="mt-4  ">
          {postInformation.previewUrl ? (
            <p className="mb-4   font-bold text-lg">Vista previa:</p>
          ) : null}

          <div className="relative w-full  bg-gray-200">
            <button onClick={()=>dispatch(removeFormImage())} className=" w-10 h-10 absolute top-0 left-0 m-2 p-2 bg-black bg-opacity-20 text-white hover:bg-white hover:bg-opacity-20 hover:text-black  hover:font-semibold rounded-full ">
              X
            </button>
            {postInformation.previewType.startsWith("image") ? (
              <figure>
                <img
                  src={postInformation.previewUrl}
                  alt="Vista previa"
                  className="max-h-[500px] w-full object-contain rounded-md"
                />
              </figure>
            ) : (
              <figure>
                <video
                  src={postInformation.previewUrl}
                  alt="Vista previa"
                  controls
                  className="max-h-[500px] w-full object-contain rounded-md"
                />
              </figure>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
