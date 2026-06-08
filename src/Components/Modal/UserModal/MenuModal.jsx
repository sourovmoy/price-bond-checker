import React, { useEffect, useRef } from "react";
import NavLinks from "../../Shared/NavLinks/Navlinks";

const MenuModal = ({ setIsMenuModalOpen, isMenuModalOpen }) => {
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuModalOpen(false);
      }
    };
    if (isMenuModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsMenuModalOpen, isMenuModalOpen]);
  if (!isMenuModalOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 transition-opacity" />

      <div
        ref={dropdownRef}
        className="fixed top-0 left-0 w-80 h-screen border-r border-gray-100 bg-white shadow-2xl z-50 p-5 animate-in slide-in-from-left duration-300"
      >
        {/* মেনুর হেডার অংশ */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-3">
          <span className="font-bold text-gray-800 text-lg">Menu</span>
          {/* ক্লোজ বাটন */}
          <button
            onClick={() => setIsMenuModalOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        {/* মেনুর কন্টেন্ট */}
        <div className="space-y-4">
          <NavLinks />
          {/* এখানে আপনার মোবাইল নেভিগেশন লিঙ্কগুলো (Link) বসিয়ে দিন */}
        </div>
      </div>
    </>
  );
};

export default MenuModal;
