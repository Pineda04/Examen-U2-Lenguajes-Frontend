import { generateId } from "../../../shared/utils";

export const AccountItemSkeleton = () => {
  return (
    <tr className="bg-gray-700 animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-600 rounded w-1/2"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-600 rounded w-2/3"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-600 rounded w-1/3"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-600 rounded w-1/2"></div>
      </td>
    </tr>
  );
};

export const AccountListSkeleton = ({ size = 2 }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-xl mt-8">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium">Código</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Nombre</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Tipo de Cuenta</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Permitir Movimiento</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(size)].map(() => (
            <AccountItemSkeleton key={generateId()} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
