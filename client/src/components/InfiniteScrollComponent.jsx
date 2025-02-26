import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPost } from "../redux/features/posts/postSlice";

const fetchPostsData = async ({ pageParam = 1 }) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/post/all?page=${pageParam}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const charLimit = 200;

const InfiniteScrollComponent = () => {
  const { ref, inView } = useInView();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null); // Estado para el ID del post seleccionado
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Cortar el contenido dependiendo de si está expandido o no
  const adjustContent = (content) => {
    return isExpanded ? content : content.slice(0, charLimit);
  };

  const postCreated = useSelector((state) => state.post.postCreated);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["allPostsData"],
      queryFn: fetchPostsData,
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
    });

  // Si scrolleo hasta abajo y hay más datos, hace refetch y los captura y muestra en tiempo real
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Si se crea un nuevo post, detecta el cambio e inicia un nuevo refetch para tener los últimos datos
  useEffect(() => {
    if (postCreated) {
      queryClient.invalidateQueries(["allPostsData"]);
      dispatch(clearPost());
    }
  }, [postCreated, queryClient, dispatch]);

  // Función para abrir el modal
  const openModal = (postId) => {
    setSelectedPostId(postId);
    document.body.classList.add("body-no-scroll"); // Bloquear el scroll del fondo
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedPostId(null);
    document.body.classList.remove("body-no-scroll"); // Habilitar el scroll del fondo
  };

  return (
    <>
      {data &&
        data.pages.map((page, i) => (
          // Este ancho determina el espacio de los posts
          <div className="w-2/3 container mx-auto border-4 mt-4 cursor-pointer" key={i}>
            {page.posts.map((post) => {
              const isModalOpen = selectedPostId === post.id; // Determina si el modal está abierto para este post

              return (
                <>
                  <article
                   onClick={() => openModal(post.id)} // Abrir modal al hacer click
                    className="container mt-8 p-8 mx-auto border-t-4"
                    key={post?.id}
                  >
                    <p className="mt-4 text-center mx-auto break-all">
                      {post?.text && adjustContent(post.text)}
                      {!isExpanded && post?.text.length > charLimit ? (
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={() => setIsExpanded(true)}
                        >
                          ... <br />
                          Ver más
                        </span>
                      ) : post.text.length > charLimit ? (
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={() => setIsExpanded(false)}
                        >
                          ... <br /> Ver menos
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                    {post?.multimedia?.endsWith("mp4" || "webm") ? (
                      <figure className="mt-4 justify-center">
                        <video
                          className="max-h-[500px] w-full object-contain cursor-pointer"
                          controls
                          src={post?.multimedia}
                          alt=""
                         
                        />
                      </figure>
                    ) : (
                      <figure className="mt-4 justify-center">
                        <img
                          className="max-h-[500px] w-full object-contain cursor-pointer"
                          src={post?.multimedia}
                          alt=""
                       
                        />
                      </figure>
                    )}
                  </article>

                  {/* Modal para mostrar el post en detalle */}
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                      <div className="bg-white p-4 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex">
                        {/* Lado izquierdo: Multimedia */}
                        <div className="w-1/2 flex justify-center items-center">
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
                        <div className="w-1/2 p-4 overflow-y-auto">
                          <h2 className="text-xl font-bold mb-4">Información del post</h2>
                          <p className="mb-4">{post?.text}</p>

                          <h3 className="text-lg font-bold mb-2">Comentarios</h3>
                          <div className="space-y-2">
                            {post?.comments?.map((comment, index) => (
                              <div key={index} className="bg-gray-100 p-2 rounded">
                                <p className="text-sm">{comment.text}</p>
                                <p className="text-xs text-gray-500">- {comment.author}</p>
                              </div>
                            ))}
                          </div>

                          <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={closeModal} // Cerrar modal al hacer clic
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        ))}

      <div ref={ref}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </div>
    </>
  );
};

export default InfiniteScrollComponent;