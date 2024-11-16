import { useState, useEffect } from "react";
import { useAccounts } from "../hooks/useAccounts";
import { AccountListSkeleton } from "./AccountListSkeleton";
import { AccountListItem } from "./AccountListItem";
import { Pagination } from "../../../shared/components";

export const AccountsPostList = () => {
  const { accounts, loadAccounts, isLoading, createAccount } = useAccounts();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetching, setFetching] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Estado para el modal
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);  // Para manejar el estado de envío

  // Cargar cuentas
  useEffect(() => {
    if (fetching) {
      loadAccounts(searchTerm, currentPage);
      setFetching(false);
    }
  }, [fetching]);

  // Funciones para la paginación
  const handlePreviousPage = () => {
    if (accounts.data.hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
      setFetching(true);
    }
  };

  const handleNextPage = () => {
    if (accounts.data.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      setFetching(true);
    }
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setFetching(true);
  };

  const handleCurrentPage = (index = 1) => {
    setCurrentPage(index);
    setFetching(true);
  };

  // Abrir y cerrar el modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Enviar el formulario para crear cuenta
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const accountData = { codigo, nombre };
    await createAccount(accountData);
    closeModal();
    setIsSubmitting(false);
    setCodigo("");
    setNombre("");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      {/* Título Principal */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Catálogo de Cuentas</h1>
      </div>

      {/* Botón de Agregar Cuenta */}
      <div className="flex justify-start mb-6">
        <button
          onClick={openModal}
          className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out hover:bg-blue-700"
        >
          Agregar Nueva Cuenta
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Agregar Nueva Cuenta</h2>
            <form onSubmit={handleCreateAccount}>
              <div className="mb-4">
                <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código</label>
                <input
                  type="text"
                  id="codigo"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Formulario de búsqueda */}
      <div className="flex justify-center mb-6">
        <form onSubmit={handleSubmitSearch} className="flex w-full md:w-1/2 mb-6">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Buscar cuentas..."
            className="px-4 py-2 w-full rounded-l-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-r-lg px-4 flex items-center justify-center border border-gray-300 hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Cargar cuentas */}
      {isLoading ? (
        <AccountListSkeleton size={6} />
      ) : (
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
              {accounts?.data?.items?.length ? (
                accounts.data.items.map((account) => (
                  <AccountListItem key={account.accountNumber} account={account} />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">No hay cuentas disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Paginación */}
      {accounts?.data?.items?.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            totalPages={accounts?.data?.totalPages}
            hasNextPage={accounts?.data?.hasNextPage}
            hasPreviousPage={accounts?.data?.hasPreviousPage}
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            handleCurrentPage={handleCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
