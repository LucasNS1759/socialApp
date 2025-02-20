import MultimediaIcon from "../assets/icons/MultimediaIcon";
import PrivacyIcon from "../assets/icons/PrivacyIncon";
import ScheduleIcon from "../assets/icons/ScheduleIcon";
import TrashIcon from "../assets/icons/TrashIcon";

const PostOptionContainer = ({ privacy, onchange, handlerClearForm }) => {
  return (
    /* Contenedor de botones */
    <div className="flex mt-5 w-full">
      {/* Contenedor de 2/3 para los botones de acciones */}
      <div className="flex justify-around items-center w-2/3">
        {/* Botón de multimedia */}

        <input
          className="hidden"
          name="mutimedia"
          type="file"
          id="fileInput"
          onChange={onchange}
        />

        <label
          title="Multimedia"
          className="p-4 h-fit cursor-pointer rounded-full hover:bg-gray-200"
          htmlFor="fileInput"
        >
          <MultimediaIcon />
        </label>

        {/* Botón de privacidad */}

        <input
          type="checkbox"
          name="privacy"
          id="privacy"
          onChange={onchange}
          className="hidden"
        />

        <label
          htmlFor="privacy"
          title={
            !privacy
              ? "Post Publico toca para que sea privado"
              : "Post Privado toca para que sea publico"
          }
          className="p-4 h-fit  rounded-full hover:bg-gray-200 cursor-pointer"
        >
          <PrivacyIcon privacy={privacy} />
        </label>

        {/* Botón de programar post */}
        <button
          title="Programa un post"
          className="p-4 h-fit border rounded-full hover:bg-gray-200"
        >
          <ScheduleIcon />
        </button>

        {/* Botón de descartar */}
        <button
          onClick={handlerClearForm}
          title="Descartar"
          className="p-4 h-fit border rounded-full hover:bg-gray-200"
        >
          <TrashIcon />
        </button>
      </div>

      {/* Contenedor de 1/3 para el botón "Publicar" con línea divisoria */}
      <div className="flex justify-center items-center w-1/3 border-l-4 border-gray-200">
        <button className="h-10 w-20 rounded-full bg-slate-200 hover:bg-gray-300">
          Publicar
        </button>
      </div>
    </div>
  );
};

export default PostOptionContainer;
