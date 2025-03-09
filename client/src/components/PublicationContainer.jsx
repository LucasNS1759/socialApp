import React, { useState } from "react";
import CommentsIcon from "../assets/icons/CommentsIcon";
import StarIcon from "../assets/icons/StarIcon";
import SavePostIcon from "../assets/icons/SavePostIcon";
import ReportIcon from "../assets/icons/ReportIcon";
import ProfileIcon from "../assets/icons/ProfileIcon";
import {format} from "date-fns";

const charLimit = 200;

const PublicationContainer = ({ openModal, post }) => {
  const [expandText, setExpandText] = useState(false);
  // Cortar el contenido dependiendo de si está expandido o no
  const formatDate = (date) => {
    return format(new Date(date), "dd MMM yy HH:mm");
  }
  const adjustTextExpansion = (content) => {
    return expandText ? content : content.slice(0, charLimit);
  };
  console.log(post)
  return (
    <article
      // Abrir modal al hacer click
      className="container mt-8 p-4 mx-auto border-t-4 "
    >
     <header className="flex items-center between space-x-4">
     <ProfileIcon post={post}/>
      <span>{post && post?.user?.profile?.name}</span>
      <span className="">{post && formatDate(post?.createdAt)}</span>
     </header>
      {/* parrafo de texto de la publicacion que se ajusta al limite establecido para mostrarse en el feed */}
      <p onClick={() => openModal(post?.id)} className="mt-4 text-center mx-auto break-all cursor-pointer">
        {post?.text && adjustTextExpansion(post.text)}
     
      </p>
      {/* si se clickea en los span de ver mas o menos el texto se va a expandir al maximo del mismo o contraer al limite establecido */}
      {!expandText && post?.text.length > charLimit ? (
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setExpandText(true)}
          >
            ... <br />
            Ver más
          </span>
        ) : post.text.length > charLimit ? (
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setExpandText(false)}
          >
            ... <br /> Ver menos
          </span>
        ) : (
          ""
        )}
        
      
      <div onClick={() => openModal(post?.id)} className="cursor-pointer">
        {post?.multimedia?.endsWith("mp4" || "webm") ? (
          <figure className="mt-4 justify-center">
            <video
              className="max-h-[500px] w-full object-contain cursor-pointer rounded-md"
              controls
              src={post?.multimedia}
              alt=""
            />
          </figure>
        ) : (
          <figure className="mt-4 justify-center">
            <img
              className="max-h-[500px] w-full object-contain cursor-pointer rounded-md"
              src={post?.multimedia}
              alt=""
            />
          </figure>
        )}
      </div>
      <div className="flex justify-around items-center mt-8">
        <label htmlFor="">
        <CommentsIcon/>
        </label>
        <label htmlFor="">
        <StarIcon/>
        </label>
        <label htmlFor="">
        <SavePostIcon/>
        </label>
        <label htmlFor="">
        <ReportIcon/>
        </label>
      </div>
    </article>
  );
};

export default PublicationContainer;
