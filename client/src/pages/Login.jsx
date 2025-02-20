import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useFormik } from "formik";
import {
  loginInitialValue,
  loginValidationSchema,
} from "../utils/authFormikConfigs";
import { loginUser } from "../services/auth/loginUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/user/userSlice";
import { alert } from "../redux/features/alerts/alertsSlice";

const Login = () => {
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
    initialValues: loginInitialValue,
    validationSchema: loginValidationSchema,
    onSubmit: async (data, { setSubmitting }) => {
      try {
        // loginUser es el servicio que loguea al usuario
        const response = await loginUser(data);
        
        //desestructuro lo que me devuelve el backend (donde el formato de respuesta esta preparado para mostrar el alerta )
        const { success, text, title, type } = response;

        if (success) {
          //login es mi accion que cambia mi estado de logueado entre true o false
          dispatch(login(success));

          //despacho mi accion de alert, los alerts estan centralizados en app
          dispatch(alert({ text, title, type }));

          navigate("/");
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
      <h2 className="mx-auto px-auto">Red social</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm  mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Iniciar Sesión
        </h2>

        {/* Campo de correo electrónico */}
        <Input
          label="Correo Electrónico"
          type="text"
          id="Email"
          name="email"
          placeholder="Ingrese un email"
          value={values?.email}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.email}
          touched={touched?.email}
        />
        {/* Campo de contraseña */}
        <Input
          label="Password"
          type="password"
          id="Password"
          name="password"
          placeholder="Ingrese su contraseña"
          value={values?.password}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.password}
          touched={touched?.password}
        />
        {/* Botón de enviar */}
        <div>
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
            {isSubmitting ? "Ingresando..." : "Login"}
          </button>
        </div>
        <p className="text-sm text-gray-800 pt-2">
          ¿Olvidate tu contraseña?{" "}
          <Link to="/">
            <span className="text-blue-500 hover:underline cursor-pointer">
              Recuperar
            </span>
          </Link>
        </p>
        <hr />
        <Link to={"/SingUp"}>
          <div className="flex justify-center items-center">
            <button className=" py-2 px-4 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              Crea una cuenta
            </button>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default Login;
