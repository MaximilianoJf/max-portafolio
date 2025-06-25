import { Link } from "react-router-dom";
import { useState } from "react";
import { useProject } from "../../hooks/useProject";
import { AlignJustify, X  } from 'lucide-react';
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const {dispatch } = useProject();

  return (
    <header className="sticky top-0 bg-gradient-to-r from-cyan-700 to-teal-800 bg-opacity-90 backdrop-blur-md shadow-md z-50 text-cyan-50 m-2 rounded-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-1xl font-bold tracking-wide select-none hover:text-teal-400 transition"
        >
          Maximiliano Jiménez
        </Link>

        <nav className="hidden md:flex space-x-10">
          <Link 
            to="/proyectos" 
            className="hover:text-teal-400 transition"
            onClick={() => dispatch({type: 'clear-selected-project'})}
          >
            Proyectos
          </Link>
          <Link 
            to="/contacto" 
            className="hover:text-teal-400 transition"
          >
            Contacto
          </Link>
        </nav>

       
        <button 
          onClick={toggleMenu}
          className="md:hidden text-teal-400 focus:outline-none" 
          aria-label="Abrir menú navegación"
          aria-expanded={isMenuOpen}
        >
          <span className="material-icons text-3xl select-none">
            {isMenuOpen ? <X /> : <AlignJustify />}
          </span>
        </button>
      </div>
      
     
      <nav 
        className={`md:hidden bg-cyan-900 bg-opacity-95 backdrop-blur-md px-6 py-4 border-t border-cyan-700 transition-all duration-300 ${isMenuOpen ? "block" : "hidden"}`}
        aria-hidden={!isMenuOpen}
      >
        <Link 
          to="/proyectos" 
          className="block py-2 border-b border-cyan-700 hover:text-teal-400 transition"
          onClick={toggleMenu}
        >
          Proyectos
        </Link>
        <Link 
          to="/contacto" 
          className="block py-2 border-b border-cyan-700 hover:text-teal-400 transition"
          onClick={toggleMenu}
        >
          Contacto
        </Link>
      </nav>
    </header>
  );
}