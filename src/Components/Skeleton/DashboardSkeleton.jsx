import React from "react";
import { Outlet } from "react-router";

const DashboardSkeleton = () => {
  return (
    <div className="hidden md:flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar skeleton */}
      <aside className="w-64 shrink-0 bg-[#244B43] hidden md:flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <div className="h-7 w-24 rounded bg-white/10 animate-pulse" />
        </div>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-4/5 rounded bg-white/10 animate-pulse" />
            <div className="h-2.5 w-3/5 rounded bg-white/15 animate-pulse" />
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-10 rounded-lg bg-white/10 animate-pulse"
            />
          ))}
        </nav>
        <div className="px-3 pb-5 pt-3 border-t border-white/10">
          <div className="h-10 rounded-lg bg-white/10 animate-pulse" />
        </div>
      </aside>

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
