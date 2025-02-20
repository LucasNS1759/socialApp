import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/user/userSlice";
import { handlerLogOut } from "../utils/handlerLogOut";

const NavBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  return (
    <nav className="navbar bg-base-100 z-50 relative">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Taringa!</a>
      </div>
      <div className="form-control align-middle w-full">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {isLoggedIn ? (
              <>
                <li>
                  <span className="justify-between">Profile</span>
                </li>
                <li>
                  <span>Settings</span>
                </li>
                <li onClick={() => handlerLogOut(dispatch)}>
                  <span>Logout</span>
                </li>
              </>
            ) : (
              <>
                {" "}
                <Link to="/Login">
                  <li>
                    <span>Login</span>
                  </li>
                </Link>
                <Link to="/SingUp">
                  <li>
                    <span>SingUp</span>
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
