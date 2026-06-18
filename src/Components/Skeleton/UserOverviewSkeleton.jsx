import React from "react";

const UserOverviewSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="space-y-1">
        <div className="h-5 w-48 rounded bg-gray-200 animate-pulse" />
        <div className="h-3.5 w-64 rounded bg-gray-100 animate-pulse" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 p-4 space-y-3"
          >
            <div className="h-9 w-9 rounded-lg bg-gray-100 animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-3 w-3/5 rounded bg-gray-100 animate-pulse" />
              <div className="h-6 w-2/5 rounded bg-gray-100 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5 h-72 animate-pulse" />
        <div className="bg-white rounded-xl border border-gray-100 p-5 h-72 animate-pulse" />
      </div>
    </div>
  );
};

export default UserOverviewSkeleton;
