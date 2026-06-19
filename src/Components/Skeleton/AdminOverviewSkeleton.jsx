import React from "react";

const AdminOverviewSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="h-5 w-44 rounded bg-gray-200 animate-pulse" />
        <div className="h-3.5 w-60 rounded bg-gray-100 animate-pulse" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-gray-100 animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-3 w-3/5 rounded bg-gray-100 animate-pulse" />
              <div className="h-6 w-2/5 rounded bg-gray-100 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="h-4 w-56 rounded bg-gray-200 animate-pulse mb-4" />
        <div className="h-48 rounded-lg bg-gray-100 animate-pulse" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Table header */}
        <div className="bg-[#244B43] px-4 py-3 grid grid-cols-7 gap-4">
          {[
            "w-4",
            "w-16",
            "w-24",
            "w-12 mx-auto",
            "w-10 mx-auto",
            "w-10 mx-auto",
            "w-14 mx-auto",
          ].map((w, i) => (
            <div
              key={i}
              className={`h-3 rounded bg-white/20 animate-pulse ${w}`}
            />
          ))}
        </div>

        {/* Table rows */}
        <div className="divide-y divide-gray-50">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="px-4 py-3 grid grid-cols-7 gap-4 items-center"
              style={{ opacity: 1 - i * 0.08 }}
            >
              <div className="h-3 w-4 rounded bg-gray-100 animate-pulse" />
              <div className="h-3.5 w-20 rounded bg-gray-200 animate-pulse" />
              <div className="h-3 w-28 rounded bg-gray-100 animate-pulse" />
              <div className="h-3.5 w-6 rounded bg-gray-100 animate-pulse mx-auto" />
              <div className="h-3.5 w-5 rounded bg-gray-100 animate-pulse mx-auto" />
              <div className="h-3.5 w-5 rounded bg-gray-100 animate-pulse mx-auto" />
              <div className="h-3.5 w-6 rounded bg-gray-100 animate-pulse mx-auto" />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t-2 border-gray-200 px-4 py-3 grid grid-cols-7 gap-4 items-center">
          <div className="h-3.5 w-16 rounded bg-gray-200 animate-pulse col-span-3" />
          <div className="h-3.5 w-6 rounded bg-gray-200 animate-pulse mx-auto" />
          <div className="h-3.5 w-5 rounded bg-gray-200 animate-pulse mx-auto" />
          <div className="h-3.5 w-5 rounded bg-gray-200 animate-pulse mx-auto" />
          <div className="h-3.5 w-6 rounded bg-gray-200 animate-pulse mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewSkeleton;
