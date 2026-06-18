import React from "react";

const MyProfileSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <div className="h-5 w-32 rounded bg-gray-200 animate-pulse" />
        <div className="h-3.5 w-48 rounded bg-gray-100 animate-pulse" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-3.5 w-28 rounded bg-gray-100 animate-pulse" />
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="h-3 w-16 rounded bg-gray-100 animate-pulse" />
            <div className="h-10 w-full rounded-xl bg-gray-100 animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-20 rounded bg-gray-100 animate-pulse" />
            <div className="h-10 w-full rounded-xl bg-gray-100 animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-24 rounded bg-gray-100 animate-pulse" />
            <div className="h-10 w-full rounded-xl bg-gray-200 animate-pulse" />
          </div>
        </div>

        {/* Button */}
        <div className="h-10 w-full rounded-xl bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

export default MyProfileSkeleton;
