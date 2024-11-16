import { Link } from "react-router-dom";

export const JournalListItem = ({ journal }) => {
  return (
    <tr className="border-b hover:bg-gray-100 transition-all duration-200">
      <td className="px-6 py-4 text-sm text-gray-800">{journal.id}</td>
      <td className="px-6 py-4 text-sm text-gray-800">{journal.description}</td>
      <td className="px-6 py-4 text-sm text-gray-800">{journal.date}</td>
      <td className="px-6 py-4 text-sm text-blue-500">
        <Link
          to={`/ver-partida/${journal.id}`}
          className="hover:text-blue-700 transition-all duration-200"
        >
          Ver Detalles
        </Link>
      </td>
    </tr>
  );
};
