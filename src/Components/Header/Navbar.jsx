import React, { useEffect, useState } from "react";
import LeftNavbar from "./LeftNavbar";
import Logo from "../Shared/Logo/Logo";

import Loading from "../Loading/Loading";
import RightNavbar from "./RightNavbar";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handelScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handelScroll);
    return () => window.removeEventListener("scroll", handelScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 md:top-0 md:bottom-auto z-50 transition-all duration-300 ease-in-out py-1 ${
        scrolled
          ? "bg-white/60 backdrop-blur-sm shadow-md"
          : "bg-white/30 backdrop-blur-none shadow-sm"
      }`}
    >
      <div className="md:px-14 sm:px-6 px-4 py-2">
        <div className="flex justify-between items-center">
          {/* left-navbar  */}
          <div className="flex gap-10">
            <Logo />
            <LeftNavbar />
          </div>
          {/* right-navbar  */}
          <div className=" flex justify-center items-center gap-3">
            <RightNavbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
