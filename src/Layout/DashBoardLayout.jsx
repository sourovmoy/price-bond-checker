import React, { useState } from "react";
import Navbar from "../Components/Header/Navbar";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiSettings,
  FiFileText,
  FiBell,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import Sidebar from "../Components/Dashboard/Sidebar";
import { Navigate, Outlet } from "react-router";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading/Loading";
import useRole from "../Hooks/useRole";

const DashBoardLayout = () => {
  const { loading, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, roleLoading } = useRole();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 sm:px-6 h-14 bg-green-100 border-b border-gray-100 shrink-0">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-[#244B43] transition-colors"
            aria-label="Open menu"
          >
            <FiMenu size={22} />
          </button>

          {/* Page title — desktop */}
          <span className="hidden lg:block text-sm font-semibold text-gray-700">
            Dashboard
          </span>

          {/* Right side */}
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative text-gray-500 hover:text-[#244B43] transition-colors">
              <FiBell size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#244B43]/10 flex items-center justify-center">
              {loading ? (
                <FiUser size={15} className="text-[#244B43]" />
              ) : user ? (
                <img
                  className="rounded-full outline-3 outline-gray-500 h-6 w-6"
                  src={user?.photoURL}
                  alt=""
                  referrerPolicy="no-referrer"
                />
              ) : (
                <FiUser size={15} className="text-[#244B43]" />
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
