import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full h-[8vh] items-center m-auto rounded-t-lg shadow-md bg-gradient-to-r from-slate-900 to-slate-700">
      <footer className="text-white">
        <p className="text-center">© 2024</p>
        <p className="text-center">
          Made by <Link to="https://www.facebook.com">Akib</Link>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
