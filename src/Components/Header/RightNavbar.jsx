import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router";
import userIcon from "../../assets/user.jpg";
import UserModal from "../Modal/UserModal/UserModal";
import DashboardNotification from "../Notification/User/DashboardNotification";

// ─── Skeleton ───────────────────────────────────────────────
const NavSkeleton = () => (
  <div className="flex items-center gap-3 animate-pulse">
    {/* "Hello, ..." text skeleton — desktop only */}
    <div className="hidden md:block h-3 w-20 bg-gray-200 rounded-full" />
    {/* Avatar skeleton */}
    <div className="hidden md:block w-10 h-10 rounded-full bg-gray-200" />
    {/* Logout button skeleton — desktop only */}
    <div className="h-8 w-16 bg-gray-200 rounded-lg" />
  </div>
);

// ─── Main Component ─────────────────────────────────────────
const RightNavbar = () => {
  const { user, logout, loading } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const firstName = user?.displayName
    ? user.displayName.split(" ")[0]
    : "Guest";

  // Loading — auth state এখনো জানা যায়নি
  if (loading) return <NavSkeleton />;

  // Logged in
  if (user) {
    return (
      <div className="relative flex items-center gap-3">
        <p className="text-sm font-semibold hidden md:inline">
          Hello, <span className="text-red-400">{firstName}</span>
        </p>

        <div className="">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block focus:outline-none"
          >
            <img
              className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover hover:scale-105 transition"
              src={user?.photoURL}
              alt="User"
            />
          </button>
          <UserModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
        </div>
        <DashboardNotification />
        <button onClick={logout} className="btn hidden md:inline">
          Sign out
        </button>
      </div>
    );
  }

  // Guest / logged out
  return (
    <div className="flex items-center gap-3">
      <p className="text-sm font-semibold hidden md:inline">
        Hello, <span className="text-green-600">Guest</span>
      </p>
      <img
        className="w-10 h-10 rounded-full border-2 border-gray-300 hidden md:inline object-cover"
        src={userIcon}
        alt="Guest"
        referrerPolicy="no-referrer"
      />
      <Link to="/login" className="btn">
        Sign in
      </Link>
    </div>
  );
};

export default RightNavbar;
