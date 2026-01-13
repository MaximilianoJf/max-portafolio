import { Link } from "react-router-dom";
import { useState } from "react";
import { useProject } from "../../hooks/useProject";

import { AlignJustify, X } from 'lucide-react';
import { ThemeSwitcher } from "../widgets/ThemeSwitcher";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { dispatch } = useProject();

  return (
    <header className="relative z-10 flex-0">
      <nav className="flex justify-evenly p-1 items-center py-4">
        <h1 className="flex items-end text-4xl">
          <Link
            to="/"
            className="hover:text-gray-500 transition"
            onClick={() => dispatch({ type: 'clear-selected-project' })}
          >
            <span className="text-foreground">MJ</span>
          </Link>
        </h1>
        <div className="flex gap-3 space-x-3">
          <ul className="hidden md:flex text-foreground gap-3 space-x-3">
            <li>
              <Link
                to="/proyectos"
                className="hover:text-gray-500 transition"
                onClick={() => dispatch({ type: 'clear-selected-project' })}
              >
                Proyectos
              </Link>
            </li>
            <li>
              <Link
                to="/contacto"
                className="hover:text-gray-500 transition"
              >
                Contacto
              </Link>
            </li>
          </ul>
          <ThemeSwitcher />
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-foreground focus:outline-none"
          aria-label="Abrir menú navegación"
          aria-expanded={isMenuOpen}
        >
          <span className="material-icons text-3xl select-none">
            {isMenuOpen ? <X /> : <AlignJustify />}
          </span>
        </button>
      </nav>


      <nav
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out
   
        ${isMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}
      
    
        bg-white/5 dark:bg-black/10 backdrop-blur-md
        border-b  border-black/10 dark:border-white/10
      `}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col px-6 py-4 gap-2">
          <Link
            to="/proyectos"
            className="block py-3 px-4 rounded-xl   hover:bg-black/10 dark:hover:bg-white/10 hover:text-gray-600 transition-colors"
            onClick={toggleMenu}
          >
            Proyectos
          </Link>
          <Link
            to="/contacto"
            className="block py-3 px-4 rounded-xl  hover:bg-black/10 dark:hover:bg-white/1 hover:text-gray-600 transition-colors"
            onClick={toggleMenu}
          >
            Contacto
          </Link>
        </div>
      </nav>
    </header>




  );
}