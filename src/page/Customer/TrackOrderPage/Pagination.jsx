import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center mt-10 gap-2">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-lg disabled:opacity-30 hover:bg-gray-100 transition-colors"
            >
                &lt;
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${currentPage === index + 1
                            ? "bg-orange-500 text-white shadow-md scale-110"
                            : "bg-white text-gray-600 hover:bg-orange-50 border"
                        }`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-lg disabled:opacity-30 hover:bg-gray-100 transition-colors"
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;