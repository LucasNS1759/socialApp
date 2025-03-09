

const PostModalContent = ({post,closeModal}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg  w-full max-h-[80vh] h-full overflow-hidden flex  ">
      {/* Lado izquierdo: Multimedia */}
      
      <div className={`w-1/3  flex justify-center items-center ${!post?.multimedia && "hidden"}`}>
        {post?.multimedia?.endsWith("mp4" || "webm") ? (
          <video
            className="w-full h-full object-contain"
            controls
            autoPlay
            src={post?.multimedia}
          />
        ) : (
          <img
            className="w-full h-full object-contain"
            src={post?.multimedia}
            alt=""
          />
        )}
      </div>

      {/* Lado derecho: Información del post y comentarios */}
      <div className={`w-2/3 p-4 overflow-y-auto  flex flex-col space-y-4 justify-center items-center text-center flex-wrap relative  ml-auto ${!post.multimedia && "w-full"}`}>
        {/* <h2 className="text-xl font-bold mb-4">Información del post</h2> */}
        <p className="mb-4 w-2/3 ">{post?.text}</p>

        <h3 className="text-lg font-bold mb-2">Comentarios</h3>
        <div className="space-y-2">
          {post?.comments?.map((comment, index) => (
            <div key={`comment-${index}`} className="bg-gray-100 p-2 rounded">
              <p className="text-sm">{comment.text}</p>
              <p className="text-xs text-gray-500">- {comment.author}</p>
            </div>
          ))}
        </div>

        <button
          className=" w-10 h-10 absolute top-0  right-0 m-2 p-2 bg-black bg-opacity-20 text-white hover:bg-white hover:bg-opacity-20 hover:text-black  hover:font-semibold rounded-full "
          onClick={closeModal} // Cerrar modal al hacer clic
        >
        X
        </button>
      </div>
    </div>
  </div>
  )
}

export default PostModalContent
