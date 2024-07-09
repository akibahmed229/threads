import { Link, Outlet } from "react-router-dom";

// User-defined imports
import { useAuth } from "../contex/AuthContex";

const Navbar = () => {
  const { isLogged, setIsLogged } = useAuth(); // Use the authentication context

  const onHandleSignout = () => {
    localStorage.removeItem("IsLoggedIn");
    setIsLogged(false);
  };

  return (
    <>
      <div className="w-full h-[8vh] shadow-md rounded-b-lg mx-auto z-10 sticky bg-gradient-to-r from-slate-700 to-slate-900">
        <div className="grid grid-cols-2">
          <div>
            <h1 className="text-white text-2xl font-bold p-3">Threads</h1>
          </div>
          <nav className="items-center h-full">
            <ul className="flex justify-around h-full text-white text-lg">
              {/* Conditional rendering of Signin or Signout based on isLogged state */}
              {!isLogged ? (
                <li className="h-full flex items-center">
                  <Link
                    to="/"
                    className="hover:text-gray-400 transition duration-300"
                  >
                    Signin
                  </Link>
                </li>
              ) : (
                <li className="h-full flex items-center">
                  <Link
                    to="/"
                    className="hover:text-gray-400 transition duration-300"
                    onClick={onHandleSignout}
                  >
                    Signout
                  </Link>
                </li>
              )}
              <li className="h-full flex items-center">
                <Link
                  to="/about"
                  className="hover:text-gray-400 transition duration-300"
                >
                  About
                </Link>
              </li>
              <li className="h-full flex items-center">
                <Link
                  to="/contact"
                  className="hover:text-gray-400 transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
