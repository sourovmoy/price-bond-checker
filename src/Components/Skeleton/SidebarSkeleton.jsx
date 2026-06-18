import React from "react";

const SidebarSkeleton = () => {
  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-full w-64 z-30 flex-col bg-[#244B43]">
      {/* Logo skeleton */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <div className="h-7 w-24 rounded bg-white/10 animate-pulse" />
        <div className="h-5 w-5 rounded bg-white/10 animate-pulse" />
      </div>

      {/* User info skeleton */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-4/5 rounded bg-white/10 animate-pulse" />
          <div className="h-2.5 w-3/5 rounded bg-white/15 animate-pulse" />
        </div>
      </div>

      {/* Nav skeleton */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-full rounded-lg bg-white/10 animate-pulse"
          />
        ))}
      </nav>

      {/* Logout skeleton */}
      <div className="px-3 pb-5 border-t border-white/10 pt-3">
        <div className="h-10 w-full rounded-lg bg-white/10 animate-pulse" />
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
