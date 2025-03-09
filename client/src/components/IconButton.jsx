const IconButton = ({ icon: Icon, title, onClick, htmlFor, className }) => {
  return htmlFor ? (
    <label
      htmlFor={htmlFor}
      title={title}
      className={`p-4 h-fit rounded-full hover:bg-gray-200 cursor-pointer ${className}`}
    >
      <Icon />
    </label>
  ) : (
    <button
      onClick={onClick}
      title={title}
      className={`p-4 h-fit border rounded-full hover:bg-gray-200 ${className}`}
    >
      <Icon />
    </button>
  );
};

export default IconButton;
