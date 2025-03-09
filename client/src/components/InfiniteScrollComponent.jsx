import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPost } from "../redux/features/posts/postSlice";
import PublicationContainer from "./PublicationContainer";
import PostModalContent from "./PostModalContent";
import fetchPostsData from "../services/posts/fetchPostsData";

const InfiniteScrollComponent = () => {
  const { ref, inView } = useInView(); // Hook para detectar si el usuario llegó al final de la página
  const [selectedPostId, setSelectedPostId] = useState(null); // Estado para el ID del post seleccionado
  const queryClient = useQueryClient(); // Hook para acceder al queryClient
  const dispatch = useDispatch();
  const postCreated = useSelector((state) => state.post.postCreated); // Estado para detectar si se creó un nuevo post

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["allPostsData"],
      queryFn: ({ pageParam = 1 }) => fetchPostsData({ pageParam }),
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
    });

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

  return (
    <>
      {data &&
        data.pages.map((page, i) => (
          // Este ancho determina el espacio de los posts
          <div
            className="w-2/3 container mx-auto border-4 mt-4 "
            key={`page-${i}`}
          >
            {page.posts.map((post) => {
              const isModalOpen = selectedPostId === post.id; // Determina si el modal está abierto para este post

              return (
                <React.Fragment key={`post-${post.id}`}>
                  <PublicationContainer openModal={openModal} post={post} />

                  {/* Modal para mostrar el post en detalle */}
                  {isModalOpen && (
                    <PostModalContent post={post} closeModal={closeModal} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        ))}
      {/* texto que indica si esta cargando nuevo contenido al llegar al final del scroll */}
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
