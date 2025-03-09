import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import handlerOnchange from "../utils/handlers/handlerOnchange";

const TextTareaUserPost = () => {
  const dispatch = useDispatch();
  const postInformation = useSelector((state) => state.post);

  const textareaRef = useRef(null); // Referencia para acceder al textarea

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Resetea la altura antes de calcular
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajusta a la altura del contenido
    }
  }, [postInformation.text]); // se ejecuta cada vez que cambia el valor del textarea

  return (
    <textarea
      ref={textareaRef} // Asigna la referencia al textarea
      className="bg-gray-50 w-full min-h-[50px] max-h-[300px] resize-none overflow-hidden p-2 border border-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="¿Qué te gustaria compartir? ..."
      value={postInformation?.text}
      name="text"
      onChange={(e) => handlerOnchange(e, postInformation, dispatch)} // Actualiza el estado con cada cambio en el textarea
    />
  );
};

export default TextTareaUserPost;
