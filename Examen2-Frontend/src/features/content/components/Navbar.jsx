import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../security/store";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleLogout = () => {
    logout();
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-lg rounded-lg">
      <div className="container flex flex-col mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="text-xl font-bold text-white">
            Sistema contable
          </Link>
          <button
            type="button"
            onClick={handleMenuToggle}
            className="block text-white hover:text-gray-300 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"></path>
            </svg>
          </button>
        </div>

        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row md:mx-4 md:space-x-8`}
        >
          <Link
            to="/accounts"
            className="my-1 text-white hover:text-gray-300 md:my-0"
          >
            Catálogo de Cuentas
          </Link>
          <Link
            to="/crear-partida"
            className="my-1 text-white hover:text-gray-300 md:my-0"
          >
            Partida Contable
          </Link>
          <Link
            to="/logs"
            className="my-1 text-white hover:text-gray-300 md:my-0"
          >
            Logs
          </Link>
          <Link
            to="/ver-partidas"
            className="my-1 text-white hover:text-gray-300 md:my-0"
          >
            Ver partidas contables
          </Link>
          {isAuthenticated ? (
            <button 
              onClick={handleLogout}
              className="my-1 text-white text-left hover:text-unah-yellow md:mx-4 md:my-0"
            >Salir</button>
          ) : (
            <Link
              to="/security/login"
              className="my-1 text-white hover:text-unah-yellow md:mx-4 md:my-0"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
