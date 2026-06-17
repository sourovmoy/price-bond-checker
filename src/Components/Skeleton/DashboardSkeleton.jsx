import React from "react";
import { Outlet } from "react-router";

const DashboardSkeleton = () => {
  return (
    <div className="hidden md:flex h-screen bg-gray-50 overflow-hidden">
      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header skeleton */}
        <header className="h-14 bg-green-100 border-b border-gray-100 flex items-center px-6 shrink-0">
          <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
          <div className="ml-auto flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse" />
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          </div>
        </header>

        {/* Outlet renders here as normal */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
