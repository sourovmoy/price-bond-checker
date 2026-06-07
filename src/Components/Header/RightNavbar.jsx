import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { AiOutlineLoading } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router";
import userIcon from "../../assets/user.jpg";
import UserModal from "../Modal/UserModal/UserModal";
const RightNavbar = () => {
  const { user, logout, loading } = useAuth();
  const firstName = user?.displayName
    ? user.displayName.split(" ")[0]
    : "Guest";
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {user ? (
        <div className="flex justify-center items-center gap- md:gap-3">
          <div className="flex flex-col md:flex-row-reverse justify-center items-center md:gap-3 border-black">
            <button onClick={() => setIsOpen(true)}>
              <img
                className="w-10 h-10 rounded-full border-3 border-gray-500"
                src={user?.photoURL}
                alt=""
              />
            </button>
            <p className="text-sm font-semibold hidden md:inline">
              Hello, <span className="">{firstName}</span>
            </p>
          </div>
          <button onClick={() => logout()} className="btn hidden md:inline">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center gap- md:gap-3">
          <div className="flex flex-col md:flex-row-reverse justify-center items-center md:gap-3 border-black">
            {loading ? (
              <div className="flex justify-center items-center animate-spin">
                <AiOutlineLoading size={30} />
              </div>
            ) : (
              <img
                className="w-10 h-10 rounded-full border-3 border-gray-500"
                src={userIcon}
                alt=""
              />
            )}

            <p className="text-sm font-semibold hidden md:inline">
              Hello, <span className="text-green-600">Guest</span>
            </p>
          </div>
          <Link to={"/login"} className="btn">
            Login
          </Link>
        </div>
      )}
      <UserModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default RightNavbar;
