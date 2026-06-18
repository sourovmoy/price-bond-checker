import React from "react";

const AdminProfileSkeleton = () => {
  return (
    <div className="p-2 sm:p-6 max-w-2xl mx-auto space-y-4">
      {/* Header text */}
      <div className="space-y-1.5 mb-6">
        <div className="h-5 w-44 rounded bg-gray-200 animate-pulse" />
        <div className="h-3.5 w-64 rounded bg-gray-100 animate-pulse" />
      </div>

      {/* Profile Header Card */}
      <div className="bg-[#244B43] rounded-xl p-6 flex items-center gap-5">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-white/10 animate-pulse shrink-0" />

        {/* Info */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-32 rounded bg-white/10 animate-pulse" />
            <div className="h-5 w-16 rounded-full bg-white/10 animate-pulse" />
          </div>
          <div className="h-3.5 w-48 rounded bg-white/10 animate-pulse" />
          <div className="flex gap-4">
            <div className="h-3 w-28 rounded bg-white/10 animate-pulse" />
            <div className="h-3 w-20 rounded bg-white/10 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Edit Form Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />

        {/* Name field */}
        <div className="space-y-1.5">
          <div className="h-3 w-20 rounded bg-gray-100 animate-pulse" />
          <div className="h-10 w-full rounded-xl bg-gray-100 animate-pulse" />
        </div>

        {/* Email field */}
        <div className="space-y-1.5">
          <div className="h-3 w-28 rounded bg-gray-100 animate-pulse" />
          <div className="h-10 w-full rounded-xl bg-gray-100 animate-pulse" />
          <div className="h-2.5 w-40 rounded bg-gray-100 animate-pulse" />
        </div>

        {/* Role field */}
        <div className="space-y-1.5">
          <div className="h-3 w-32 rounded bg-gray-100 animate-pulse" />
          <div className="h-10 w-full rounded-xl bg-gray-100 animate-pulse" />
        </div>

        {/* Button */}
        <div className="h-10 w-full rounded-xl bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

export default AdminProfileSkeleton;
