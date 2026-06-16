import React from "react";
import useAuth from "../../Hooks/useAuth";
import { NavLink, useNavigate } from "react-router";
import {
  FiFileText,
  FiHome,
  FiLogOut,
  FiSettings,
  FiUser,
  FiX,
} from "react-icons/fi";
import Logo from "../Shared/Logo/Logo";

const Sidebar = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const NAV_ITEMS = [
    { to: "/dashboard", icon: <FiHome />, label: "Overview" },
    { to: "/dashboard/profile", icon: <FiUser />, label: "My Profile" },
    { to: "/dashboard/bonds", icon: <FiFileText />, label: "My Bonds" },
    { to: "/dashboard/settings", icon: <FiSettings />, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-30 flex flex-col
          bg-[#244B43] text-white
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo + close */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <Logo />
          <button
            onClick={onClose}
            className="lg:hidden text-white/70 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <img
            src={
              user?.photoURL ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(user?.displayName || "U")
            }
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-white/60 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 border-t border-white/10 pt-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <FiLogOut className="text-base" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
