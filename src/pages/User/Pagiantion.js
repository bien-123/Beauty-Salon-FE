import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    function getPages(currentPage, totalPages) {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        } else if (currentPage < 3) {
            return [1, 2, 3, 4, 5];
        } else if (currentPage > totalPages - 2) {
            return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
        }
    }

    return (
        <div className="flex justify-center mt-5">
            <button
                style={{
                    visibility: currentPage === 1 ? 'hidden' : 'visible',
                    textDecoration: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                }}
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Goto Previous Page"
            >
                Trước
            </button>
            {getPages(currentPage, totalPages).map((page) => (
                <button
                    key={page}
                    className={`px-3 py-2 mx-2 rounded-md ${
                        currentPage === page ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                style={{
                    visibility: currentPage === totalPages ? 'hidden' : 'visible',
                    textDecoration: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                }}
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Goto Next Page"
            >
                Sau
            </button>
        </div>
    );
};

export default Pagination;
