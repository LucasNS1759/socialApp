import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import showAlert from "./utils/sweetAlertConfig";
import { useEffect } from "react";
import {
  fetchLoginStatus,

  UserSelectError,
  UserSelectIsLoading,
  UserSelectIsLoggedIn,
} from "./redux/features/user/userSlice";
import Loading from "./components/Loading";
import { alert } from "./redux/features/alerts/alertsSlice";
import Practica from "./components/Practica";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { title, type, text, isVisible } = useSelector((state) => state.alert);
  const isLoggedIn = useSelector(UserSelectIsLoggedIn);
  const isLoading = useSelector(UserSelectIsLoading);
  const error = useSelector(UserSelectError);

  useEffect(() => {
    dispatch(fetchLoginStatus());
  }, []);

  useEffect(() => {
    if (isVisible) {
      showAlert(type, title, text, dispatch);
    }
  }, [isVisible, text, title, type, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(
        alert({ type: error.type, title: error.title, text: error.text })
      );
    }
  }, [error, dispatch]);

  if (isLoading) return <Loading />;

  return (
    <div>
      {location.pathname !== "/Login" && location.pathname !== "/SingUp" && (
        <NavBar />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Login"
          element={isLoggedIn ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/SingUp"
          element={isLoggedIn ? <Navigate to={"/"} /> : <SingUp />}
        />
        <Route path="/practica" element={<Practica/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
