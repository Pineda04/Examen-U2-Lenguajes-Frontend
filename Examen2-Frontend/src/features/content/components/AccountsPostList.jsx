import { useState, useEffect } from "react";
import { useAccounts } from "../hooks/useAccounts";
import { AccountListSkeleton } from "./AccountListSkeleton";
import { AccountListItem } from "./AccountListItem";
import { Pagination } from "../../../shared/components";

export const AccountsPostList = () => {
  const { accounts, loadAccounts, isLoading, createAccounts } = useAccounts();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetching, setFetching] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState(""); // Estado para accountNumber
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Para manejar el estado de envío

  // Cargar cuentas
  useEffect(() => {
    if (fetching) {
      loadAccounts(searchTerm, currentPage);
      setFetching(false);
    }
  }, [fetching, currentPage, searchTerm, loadAccounts]);

  // Funciones de paginación
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

  const handleCurrentPage = (index = 1) => {
    setCurrentPage(index);
    setFetching(true);
  };

  // Abrir y cerrar el modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Función para crear la cuenta
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Establecer el estado de envío como verdadero

    const accountData = {
      accountNumber,
      name,
    };

    try {
      await createAccounts(accountData);
      closeModal();
      setAccountNumber("");
      setName("");
    } catch (error) {
      console.error("Error al crear la cuenta", error);
    } finally {
      setIsSubmitting(false); // Establecer el estado de envío como falso
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Catálogo de Cuentas</h1>
      </div>

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
                <label htmlFor="accountNumber" className="block text-sm font-medium text-black">Número de Cuenta</label>
                <input
                  type="text"
                  id="accountNumber"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-700 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-black">Nombre</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-700 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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

      {isLoading ? (
        <AccountListSkeleton size={6} />
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-xl mt-8">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">Número de Cuenta</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Nombre</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Tipo de Cuenta</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Permitir Movimiento</th>
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
