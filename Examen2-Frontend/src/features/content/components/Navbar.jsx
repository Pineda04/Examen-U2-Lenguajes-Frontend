import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg rounded-lg">
      <ul className="flex space-x-8 text-white justify-center">
        <li className="transition transform hover:scale-105 hover:opacity-80">
          <Link
            to="/accounts"
            className="font-semibold hover:text-gray-300 text-lg"
          >
            Catálogo de Cuentas
          </Link>
        </li>
        <li className="transition transform hover:scale-105 hover:opacity-80">
          <Link
            to="/crear-partida"
            className="font-semibold hover:text-gray-300 text-lg"
          >
            Partida Contable
          </Link>
        </li>
        <li className="transition transform hover:scale-105 hover:opacity-80">
          <Link
            to="/logs"
            className="font-semibold hover:text-gray-300 text-lg"
          >
            Logs
          </Link>
        </li>
        <li className="transition transform hover:scale-105 hover:opacity-80">
          <Link
            to="/ver-partidas"
            className="font-semibold hover:text-gray-300 text-lg"
          >
            Ver partidas contables
          </Link>
        </li>

        <li className="transition transform hover:scale-105 hover:opacity-80">
          <Link
            to="/login"
            className="font-semibold hover:text-gray-300 text-lg"
          >
            Iniciar Sesión
          </Link>
        </li>
      </ul>
    </nav>
  );
};
