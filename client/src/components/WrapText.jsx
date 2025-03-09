import React, { useState } from "react";

const WrapText = ({ post }) => {
  const [expandText, setExpandText] = useState(false);
  const charLimit = 200;
  // Cortar el contenido dependiendo de si está expandido o no
  const adjustTextExpansion = (content) => {
    return expandText ? content : content.slice(0, charLimit);
  };

  return (
    <React.Fragment>
      <p
      
        className="mt-4 text-center mx-auto break-all cursor-pointer"
      >
        {post?.text && adjustTextExpansion(post.text)}
      </p>
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
    </React.Fragment>
  );
};

export default WrapText;
