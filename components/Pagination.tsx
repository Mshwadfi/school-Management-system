"use client";

import { ITEM_PER_PAGE } from "@/lib/constants";
import { useState } from "react";

const Pagination = ({ items }: { items: number }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(items / ITEM_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((pageNum) => pageNum + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((pageNum) => pageNum - 1);
    }
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={currentPage === 0}
        onClick={handlePrev}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`px-3 py-2 rounded-md ${
              index === currentPage ? "bg-Sky" : "bg-transparent"
            }`}
            onClick={() => setCurrentPage(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        disabled={currentPage === totalPages - 1}
        onClick={handleNext}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
