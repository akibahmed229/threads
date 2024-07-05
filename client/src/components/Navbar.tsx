import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-[8vh] shadow-md rounded-b-lg mx-auto z-10 sticky bg-gradient-to-r from-slate-700 to-slate-900">
      <div className="grid grid-cols-2">
        <div>
          <h1 className="text-white text-2xl font-bold p-3">Threads</h1>
        </div>
        <nav className="items-center h-full">
          <ul className="flex justify-around h-full text-white text-lg">
            <li className="h-full flex items-center">
              <Link
                to="/"
                className="hover:text-gray-400 transition duration-300"
              >
                Home
              </Link>
            </li>
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
  );
};

export default Navbar;
