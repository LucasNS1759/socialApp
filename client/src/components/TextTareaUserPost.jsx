import { useEffect, useRef } from "react";

const TextTareaUserPost = ({ value, onchange, placeholder,name }) => {
  const textareaRef = useRef(null); // Referencia para acceder al textarea

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Resetea la altura antes de calcular
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajusta a la altura del contenido
    }
  }, [value]); // se ejecuta cada vez que cambia el valor del textarea

  return (
    <textarea
      ref={textareaRef} // Asigna la referencia al textarea
      className="bg-gray-50 w-full min-h-[50px] max-h-[300px] resize-none overflow-hidden p-2 border border-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onchange} // Actualiza el estado con cada cambio en el textarea
    />
  );
};

export default TextTareaUserPost;
