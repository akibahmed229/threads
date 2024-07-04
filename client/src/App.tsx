import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./app/Home";
import Error from "./app/Error";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-slate-500 to-slate-800">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
