import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { AiOutlineLoading } from "react-icons/ai";
import { Link } from "react-router";
import userIcon from "../../assets/user.jpg";
import UserModal from "../Modal/UserModal/UserModal";

const RightNavbar = () => {
  const { user, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const firstName = user?.displayName
    ? user.displayName.split(" ")[0]
    : "Guest";

  return (
    /* 🟢 মেইন কন্টেইনারকে ref দেওয়া হলো বাইরের ক্লিক ট্র্যাক করতে */
    <div className="flex justify-center items-center gap-3">
      {user ? (
        <>
          <div className="flex flex-col md:flex-row-reverse justify-center items-center md:gap-3">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="block focus:outline-none"
              >
                <img
                  className="w-10 h-10 rounded-full border-2 border-gray-500 object-cover cursor-pointer hover:scale-105 transition"
                  src={user?.photoURL}
                  alt="User"
                />
              </button>
              {/* 🟢 মোডাল কম্পোনেন্টটি এখন এই বাটনের ঠিক নিচে রাইট সাইড ঘেঁষে রেন্ডার হবে */}
              <UserModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
            </div>

            <p className="text-sm font-semibold hidden md:inline">
              Hello, <span className="text-red-400">{firstName}</span>
            </p>
          </div>

          <button onClick={() => logout()} className="btn hidden md:inline">
            Logout
          </button>
        </>
      ) : (
        // গেস্ট বা লগআউট স্টেট (আগের মতোই থাকবে)
        <div className="flex justify-center items-center gap-3">
          <div className="flex flex-col md:flex-row-reverse justify-center items-center md:gap-3">
            {loading ? (
              <div className="flex justify-center items-center animate-spin">
                <AiOutlineLoading size={30} />
              </div>
            ) : (
              <img
                className="w-10 h-10 rounded-full border-2 border-gray-500"
                src={userIcon}
                alt="Guest"
              />
            )}
            <p className="text-sm font-semibold hidden md:inline">
              Hello, <span className="text-green-600">Guest</span>
            </p>
          </div>
          <Link to={"/login"} className="btn hidden md:inline">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default RightNavbar;
