import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useFormik } from "formik";
import {
  singUpInitialValue,
  singUpValidationSchema,
} from "../utils/authFormikConfigs";
import { singUpUsers } from "../services/auth/singUpUser";
import { useNavigate } from "react-router-dom";
import { alert } from "../redux/features/alerts/alertsSlice";
import { useDispatch } from "react-redux";

const SingUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
    isSubmitting,
    isValid,
    dirty,
  } = useFormik({
    initialValues: singUpInitialValue,
    validationSchema: singUpValidationSchema,
    onSubmit: async (data, { setSubmitting }) => {
      try {
          // Llama a la función signUpUsers y espera la alerta
          const response = await singUpUsers(data);
          const { success, text, title, type } = response;
          if (success) {
              // Navega solo si el registro fue exitoso
              dispatch(alert({ text, title, type }));
              navigate("/Login");
          }
      } catch (error) {
        console.error("Error en el registro:", error);
        const { type, title, text } = error;
        dispatch(alert({ type, title, text }));
      } finally {
          setSubmitting(false); // Asegura que el estado de envío se restablezca
      }
  },
});

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <h1 className="mx-auto px-auto">Red social</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-xs  mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Registrarse
        </h2>

        {/* Campo de correo electrónico */}
        <Input
          label="Correo Electrónico"
          type="text"
          id="email"
          name="email"
          value={values?.email}
          placeholder="Escribe tu correo"
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.email}
          touched={touched?.email}
          className="mt-1 block w-full px-4 py-2 text-base text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Campo de contraseña */}
        <Input
          label="Contraseña"
          type="password"
          id="password"
          name="password"
          value={values?.password}
          placeholder="Escribe tu contraseña"
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.password}
          touched={touched?.password}
          className="mt-1 block w-full px-4 py-2 text-base text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {/* Campo de name */}
        <Input
          label="Nombre"
          type="text"
          id="name"
          name="name"
          value={values?.name}
          placeholder="Escribe tu Nombre"
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.name}
          touched={touched?.name}
          className="mt-1 block w-full px-4 py-2 text-base text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {/* Campo de surname */}
        <Input
          label="Apellido"
          type="text"
          id="surName"
          name="surName"
          value={values?.surName}
          placeholder="Escribe tu Apellido"
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.surName}
          touched={touched?.surName}
          className="mt-1 block w-full px-4 py-2 text-base text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <div>
          <label htmlFor="gender" className="block text-gray-700 font-medium">
            Género
          </label>
          <select
            id="gender"
            name="gender"
            value={values?.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full px-4 py-2 text-base text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="" disabled>
              Selecciona tu género
            </option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
          {touched.gender && errors.gender && (
            <p className="text-orange-500 text-sm font-medium mt-1">
              {errors?.gender}
            </p>
          )}
        </div>

        {/* Botón de enviar */}

        <button
          type="submit"
          disabled={!isValid || !dirty}
          className={`w-full py-2 px-4 font-semibold rounded-md focus:ring-2 focus:outline-none 
    ${
      !isValid || !dirty
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600 text-white"
    }
  `}
        >
          {isSubmitting ? "Enviando..." : "Crear Cuenta"}
        </button>

        <p className="text-sm text-gray-800 pt-2">
          ¿tienes una cuenta?{" "}
          <Link to="/Login">
            <span className="text-blue-500 hover:underline cursor-pointer">
              iniciar sesion
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SingUp;
