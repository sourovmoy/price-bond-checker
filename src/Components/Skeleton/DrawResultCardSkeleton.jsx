import React from "react";

const DrawResultCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="space-y-2">
            <div className="h-4 w-16 bg-gray-100 rounded-lg" />
            <div className="h-6 w-24 bg-gray-200 rounded-lg" />
            <div className="h-3 w-24 bg-gray-200 rounded-lg" />
          </div>
          <div className="h-6 w-20 bg-gray-100 rounded-lg" />
        </div>

        {/* Prize rows */}
        <div className="bg-gray-50 rounded-xl p-3 space-y-3 mb-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
              <div className="h-3 w-8 bg-gray-100 rounded" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-1 mb-3">
          <div className="h-3 w-16 bg-gray-100 rounded" />
          <div className="h-3 w-24 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Button skeleton */}
      <div className="h-9 w-full bg-gray-100 rounded-xl mt-2" />
    </div>
  );
};

export default DrawResultCardSkeleton;
