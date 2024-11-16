import { generateId } from "../utils";

export const Pagination = ({
  totalPages,
  handlePreviousPage = () => {},
  hasPreviousPage,
  handleCurrentPage,
  currentPage,
  handleNextPage = () => {},
  hasNextPage,
}) => {
  return (
    <div className="flex">
      <button
        onClick={handlePreviousPage}
        disabled={!hasPreviousPage}
        className={`px-3 py-2 mx-1 font-bold bg-yellow-500 text-white rounded-md ${!hasPreviousPage ? "cursor-not-allowed" : "hover:bg-yellow-400"}`}
      >
        Anterior
      </button>
      {[...Array(totalPages)].map((value, index) => (
        <button
          key={generateId()}
          onClick={() => handleCurrentPage(index + 1)}
          className={`px-3 py-2 mx-1 font-medium rounded-md text-gray-700 ${currentPage === index + 1 ? "bg-unah-blue text-white" : "hover:bg-unah-blue hover:text-white"}`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={!hasNextPage}
        className={`px-3 py-2 mx-1 font-bold bg-yellow-500 text-white rounded-md ${!hasNextPage ? "cursor-not-allowed" : "hover:bg-yellow-400"}`}
      >
        Siguiente
      </button>
    </div>
  );
};
