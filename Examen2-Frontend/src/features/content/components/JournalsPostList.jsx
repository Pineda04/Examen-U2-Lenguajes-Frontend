import { useState, useEffect } from "react";
import { useJournals } from "../hooks/useJournals";
import { JournalListItem } from "./JournalListItem";
import { JournalListSkeleton } from "./JournalListSkeleton";
import { Pagination } from "../../../shared/components";

export const JournalsPostList = () => {
  const { journals, loadJournals, isLoading } = useJournals();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetching, setFetching] = useState(true);

  // Cargar partidas
  useEffect(() => {
    if (fetching) {
      loadJournals(searchTerm, currentPage);
      setFetching(false);
    }
  }, [fetching, currentPage, searchTerm, loadJournals]);

  // Funciones de paginación
  const handlePreviousPage = () => {
    if (journals.data.hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
      setFetching(true);
    }
  };

  const handleNextPage = () => {
    if (journals.data.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      setFetching(true);
    }
  };

  const handleCurrentPage = (index = 1) => {
    setCurrentPage(index);
    setFetching(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Lista de Partidas</h1>
      </div>

      {isLoading ? (
        <JournalListSkeleton size={6} />
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-xl mt-8">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">Identificador de la Partida</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Descripción</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Fecha</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {journals?.data?.items?.length ? (
                journals.data.items.map((journal) => (
                  <JournalListItem key={journal.id} journal={journal} />
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">No hay partidas disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {journals?.data?.items?.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            totalPages={journals?.data?.totalPages}
            hasNextPage={journals?.data?.hasNextPage}
            hasPreviousPage={journals?.data?.hasPreviousPage}
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
