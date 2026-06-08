import React, { useEffect, useState } from "react";
import LeftNavbar from "./LeftNavbar";
import Logo from "../Shared/Logo/Logo";
import Loading from "../Loading/Loading";
import RightNavbar from "./RightNavbar";
import { RiMenuUnfold3Fill } from "react-icons/ri";
import MenuModal from "../Modal/UserModal/MenuModal";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  useEffect(() => {
    const handelScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handelScroll);
    return () => window.removeEventListener("scroll", handelScroll);
  }, []);

  return (
    <div
      /* 🟢 ফিক্সড ক্লাস: inset-x-0 এর বদলে top-0 left-0 w-full ব্যবহার করা হয়েছে */
      /* এটি মোডাল ওপেন হলেও নেভবারের কন্টেইনারকে স্ক্রিনের সাথে লক করে রাখবে */
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out py-1 ${
        scrolled
          ? "bg-white/60 backdrop-blur-sm shadow-md"
          : "bg-white/30 backdrop-blur-none shadow-sm"
      }`}
    >
      <div className="md:px-14 sm:px-6 px-4 py-2">
        <div className="flex justify-between items-center">
          {/* left-navbar  */}
          <div className="relative flex items-center gap-10">
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuModalOpen(true);
                }}
                className="inline md:hidden"
              >
                <RiMenuUnfold3Fill size={20} />
              </button>
              <MenuModal
                isMenuModalOpen={isMenuModalOpen}
                setIsMenuModalOpen={setIsMenuModalOpen}
              />
              <Logo />
            </div>
            <LeftNavbar />
          </div>

          {/* right-navbar  */}
          {/* 🟢 এখানে অপ্রয়োজনীয় স্পেসটি ট্রিম করে gap-3 পারফেক্ট করা হয়েছে */}
          <div className="flex justify-center items-center gap-3">
            <RightNavbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
