import React, { useEffect, useRef, useState } from "react";
const content =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quo optio delectus culpa recusandae sed iste officia blanditiis nihil explicabo, vero dolorem expedita, sint doloribus nesciunt assumenda fugiat alias perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quo optio delectus culpa recusandae sed iste officia blanditiis nihil explicabo, vero dolorem expedita, sint doloribus nesciunt assumenda fugiat alias perferendis Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quo optio delectus culpa recusandae sed iste officia blanditiis nihil explicabo, vero dolorem expedita, sint doloribus nesciunt assumenda fugiat alias perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quo optio delectus culpa recusandae sed iste officia blanditiis nihil explicabo, vero dolorem expedita, sint doloribus nesciunt assumenda fugiat alias perferendis Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quo optio delectus culpa recusandae sed iste officia blanditiis nihil explicabo, vero dolorem expedita, sint doloribus nesciunt assumenda fugiat alias perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quo optio delectus culpa recusandae sed iste officia blanditiis nihil explicabo, vero dolorem expedita, sint doloribus nesciunt assumenda fugiat alias perferendis...";

const Practica = () => {
  const [text, setText] = useState(""); // Estado para guardar el texto
  const textareaRef = useRef(null); // Referencia para acceder al textarea

  // Ajusta la altura automáticamente
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Resetea la altura antes de calcular
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajusta a la altura del contenido
    }
  }, [text]); //

  const [isExpanded, setIsExpanded] = useState(false);

  // Definir cuántos caracteres mostrar antes de mostrar el botón "Ver más"
  const charLimit = 200; // Puedes ajustar esto según lo que necesites

  // Cortar el contenido dependiendo de si está expandido o no
  const truncatedContent = isExpanded ? content : content.slice(0, charLimit);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100  items-center justify-center">
      <header className="fixed top-0 w-full bg-slate-300 py-2 px-8 z-10">
        <nav className="flex justify-between items-center w-full">
          {/* Sección izquierda: Enlaces */}
          <div className="flex space-x-6">
            <a href="#" className="text-white">
              1
            </a>
            <a href="#" className="text-white">
              2
            </a>
            <a href="#" className="text-white">
              3
            </a>
            <a href="#" className="text-white">
              4
            </a>
          </div>

          {/* Sección central: Título */}
          <div className="flex justify-center mx-auto">
            <h1 className="text-white text-5xl">Título épico</h1>
          </div>

          {/* Sección derecha: Botones */}
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-slate-700  transition-colors ">
              Botón 1
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
              Botón 2
            </button>
          </div>
        </nav>
      </header>

      <main className="min-h-screen flex w-full">
        {/* Sidebar izquierdo */}
        <aside className="w-64 max-h-full mt-16 bg-gray-100  p-4 fixed top-0 left-0 h-full lg:block hidden border-r shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Sidebar</h2>
          <ul className="text-center">
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-300">
                perfil
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-300">
                mensajes
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-300">
                guardado
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-300">
                notificaciones
              </a>
            </li>

            <button className="w-full py-2 px-4 hover:bg-gray-300">
              Postear
            </button>
          </ul>
        </aside>

        {/* Contenido principal */}
        <div className="container mx-auto px-4 lg:ml-64 mt-20 flex flex-col text-center">
        {/* FOEMULARIO DE POSTEO    ===== */}
          <div className="w-2/3 container mx-auto border  rounded-lg px-2  pt-5 pb-20 h-auto shadow-2xl">
            <textarea
              ref={textareaRef} // Asigna la referencia al textarea
              className="bg-gray-50 w-full min-h-[50px] max-h-[300px] resize-none overflow-hidden p-2 border border-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Que te gustaria contarnos?..."
              value={text}
              onChange={(e) => setText(e.target.value)} // Actualiza el estado con cada cambio en el textarea
            />
          </div>
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
        <aside className="w-1/3 bg-gray-100 p-4 md:block hidden border-l shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Sección derecha</h2>
          <p>Este es el contenido de la sección derecha.</p>
        </aside>
      </main>
      <footer className="lg:hidden p-4 bg-gray-400 text-white w-full flex justify-between fixed bottom-0 left-0 z-50">
        <a href="#" className="block py-2 px-4">
          Perfil
        </a>
        <a href="#" className="block py-2 px-4">
          Mensajes
        </a>
        <a href="#" className="block py-2 px-4">
          Guardado
        </a>
        <a href="#" className="block py-2 px-4">
          Notificaciones
        </a>
      </footer>
    </div>
  );
};

export default Practica;
