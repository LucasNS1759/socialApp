import { useInView } from "react-intersection-observer";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import React, { useEffect } from "react";
import PublicationContainer from "../PublicationContainer";
import useThreadPost from "../../hooks/useThreadPost";

const Thread = ({ setCurrentView, id,currentView }) => {
  
  // Hook para detectar si el usuario llegó al final de la página
  const { ref, inView } = useInView();
  // Hook para acceder al queryClient
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const postCreated = useSelector((state) => state.post.postCreated); // Estado para detectar si se creó un nuevo post

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useThreadPost(id,currentView);

  // Si scrolleo hasta abajo y hay más datos, hace refetch y los captura y muestra en tiempo real
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Si se crea un nuevo post, detecta el cambio e inicia un nuevo refetch para tener los últimos datos
  useEffect(() => {
    if (postCreated) {
      queryClient.invalidateQueries(["allPosts"]);
      dispatch(clearPost());
    }
  }, [postCreated, queryClient, dispatch]);

  return (
    <>
      {data &&
        data.pages.map((page, i) => (
          // Este ancho determina el espacio de los posts
          <div
            className="w-full container mx-auto border-4 mt-4 "
            key={`page-${i}`}
          >
            {page.posts.map((post) => (
              <React.Fragment key={`post-${post.id}`}>
                <PublicationContainer
                  setCurrentView={setCurrentView}
                  post={post}
                />

                {post?.comments?.map((comment) => (
                    
                  <React.Fragment key={`comment-${comment?.id}`}>
                    <PublicationContainer
                      setCurrentView={setCurrentView}
                      type="comment"
                      post={comment}
                    />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
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

export default Thread;
