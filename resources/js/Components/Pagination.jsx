import React from 'react';
import { Link } from '@inertiajs/react';

function Pagination({ prevPageUrl, nextPageUrl, currentPage, totalPages }) {
    const getPageRange = () => {
        const limit = 5;
        // Calculate the start and end page based on the current page and the limit
        let startPage = Math.max(1, currentPage - Math.floor(limit / 2));
        let endPage = startPage + limit - 1;

        // Adjust the end page if it exceeds the total number of pages
        if (endPage > totalPages) {
            endPage = totalPages;
            // Recalculate the start page to ensure the limit is maintained
            startPage = Math.max(1, endPage - limit + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };

    return (
        <div className="flex flex-wrap justify-center mt-4 gap-3">
            {prevPageUrl ? (
                <Link
                    className="px-3 py-2 bg-white text-[var(--main-blue)] border border-[var(--main-blue)] rounded transition duration-200 hover:bg-[var(--main-blue)] hover:text-white"
                    href={prevPageUrl}
                >
                    Previous
                </Link>
            ) : (
                <Link
                    disabled={true}
                    className="px-3 py-2 bg-gray-300 text-white border border-gray-300 rounded hover:cursor-default"
                    href={prevPageUrl}
                >
                    Previous
                </Link>
            )}
            {getPageRange().map((page) => (
                <Link
                    key={page}
                    href={`?page=${page}`}
                    className={`px-3 py-2 ${currentPage === page ? 'bg-[var(--main-blue)] text-white' : 'bg-white text-[var(--main-blue)] border border-[var(--main-blue)]'} rounded hover:bg-[var(--main-blue)] hover:text-white`}
                >
                    {page}
                </Link>
            ))}
            {nextPageUrl ? (
                <Link
                    className="px-3 py-2 bg-white text-[var(--main-blue)] border border-[var(--main-blue)] rounded transition duration-200 hover:bg-[var(--main-blue)] hover:text-white"
                    href={nextPageUrl}
                >
                    Next
                </Link>
            ) : (
                <Link
                    className="px-3 py-2 bg-gray-300 text-white border border-gray-300 rounded hover:cursor-default"
                    href={nextPageUrl}
                >
                    Next
                </Link>
            )}
        </div>
    );
}

export default Pagination;