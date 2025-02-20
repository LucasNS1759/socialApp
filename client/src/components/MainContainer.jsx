import { useState } from "react";
import FormPost from "./FormPost";
import SideBar from "./SideBar"
import SeccionSugerencias from "./SeccionSugerencias.";
const content =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quo optio delectus culpa recusandae sed iste officia blanditiis nihil explicabo, vero dolorem expedita, sint doloribus nesciunt assumenda fugiat alias perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quo optio delectus culpa recusandae sed iste officia blanditiis nihil explicabo, vero dolorem expedita, sint doloribus nesciunt assumenda fugiat alias perferendis Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quo optio delectus culpa recusandae sed iste officia blanditiis nihil explicabo, vero dolorem expedita, sint doloribus nesciunt assumenda fugiat alias perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quo optio delectus culpa recusandae sed iste officia blanditiis nihil explicabo, vero dolorem expedita, sint doloribus nesciunt assumenda fugiat alias perferendis Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quo optio delectus culpa recusandae sed iste officia blanditiis nihil explicabo, vero dolorem expedita, sint doloribus nesciunt assumenda fugiat alias perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quo optio delectus culpa recusandae sed iste officia blanditiis nihil explicabo, vero dolorem expedita, sint doloribus nesciunt assumenda fugiat alias perferendis...";
const MainContainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const charLimit = 200; // Puedes ajustar esto según lo que necesites

  // Cortar el contenido dependiendo de si está expandido o no
  const truncatedContent = isExpanded ? content : content.slice(0, charLimit);

  return (
    <main className="min-h-screen flex w-full">
     {/* Sidebar izquierdo */}
    <SideBar/>
    <div className="container mx-auto px-4 lg:ml-64 mt-20 flex flex-col text-center">
      {/* FOEMULARIO DE POSTEO    ===== */}
      <FormPost />
      {/* ?/////////////////// */}
      <article className="container mt-8 p-8 shadow-xl mx-auto">
        <h2 className="text-2xl font-semibold mt-8">
          Como React Cambió el panorama en el Front End
        </h2>
        <p className="mt-4 w-3/4 text-center mx-auto">
          {truncatedContent}
          {!isExpanded && content.length > charLimit ? (
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsExpanded(true)}
            >
              ... <br />
              Ver más
            </span>
          ) : (
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsExpanded(false)}
            >
              ... <br /> Ver menos
            </span>
          )}
        </p>
        <figure className="mt-4 justify-center flex">
          <img
            className="w-2/3 h-2/3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXZn4-f2IsfkUDHzDAjFwuSL7v-JZGpHGvHg&s"
            alt=""
          />
        </figure>
      </article>
    </div>
     {/* Sección derecha */}
     <SeccionSugerencias/>
    </main>
  );
};

export default MainContainer;
