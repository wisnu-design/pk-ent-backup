import React from "react";

type Props = {};

function Pagination({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}: any) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  function handleClick(pageNumber: any) {
    onPageChange(pageNumber);
  }

  return (
    <div className="flex items-center justify-center my-8 transition-all duration-200 ease-out">
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
        {currentPage > 1 && (
          <button
            onClick={() => handleClick(currentPage - 1)}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Previous
          </button>
        )}
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={index}
              onClick={() => handleClick(pageNumber)}
              className={`${
                pageNumber === currentPage
                  ? "bg-black text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium`}
            >
              {pageNumber}
            </button>
          );
        })}
        {currentPage < totalPages && (
          <button
            onClick={() => handleClick(currentPage + 1)}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Next
          </button>
        )}
      </nav>
    </div>
  );
}

export default Pagination;
