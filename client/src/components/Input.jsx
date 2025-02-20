const Input = ({ label, type, id, name, placeholder, value,onChange,onBlur,touched,errors }) => {
  return (
    <div className="flex flex-col justify-center align-middle text-center " >
      <label  className="block text-sm font-medium text-gray-700"
      htmlFor={name}>{label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}

        className="mt-1 block w-full px-4 py-2 text-base text-white-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
        <div
          id="validation"
          className="text-center text-orange-500 font-bold text-sm   w-52 mx-auto  py-.5 my-1  "
        >
          {" "}
          {touched && errors ? (
            <p className="">{errors}</p>
          ) : null}
        </div>
    </div>
  );
};

export default Input;
