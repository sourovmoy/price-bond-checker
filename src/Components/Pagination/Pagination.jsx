import React from "react";

const Pagination = ({ page, totalPages, hasPrev, hasNext, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-between mt-8">
      <span className="text-sm text-gray-500">
        পেজ {page} / {totalPages}
      </span>

      <div className="flex items-center gap-1.5">
        {/* Prev */}
        <button
          onClick={() => onPageChange((p) => p - 1)}
          disabled={!hasPrev}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ‹
        </button>

        {/* Page numbers */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all ${
              p === page
                ? "bg-[#244B43] text-white border-transparent"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange((p) => p + 1)}
          disabled={!hasNext}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Pagination;
