import React, { useRef, useEffect } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLogout } from "react-icons/hi";
import useAuth from "../../../Hooks/useAuth";

export default function UserModal({ setIsOpen, isOpen }) {
  const { user, logout } = useAuth(); // 🟢 সরাসরি গ্লোবাল স্টেট থেকে ডাটা এবং মেথড রিসিভ
  const dropdownRef = useRef(null);

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার চমৎকার লজিক
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  if (!isOpen) return null;
  const { displayName, email } = user || {};
  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-5 w-80 rounded-2xl border border-gray-100 bg-white shadow-2xl z-50 p-5 animate-in fade-in zoom-in-95 duration-200"
    >
      {/* 🟢 আপনার সেই চমৎকার প্রফেশনাল ইউজার ইনফো ও ইমেইল ডিজাইনের কোড... */}
      <h3 className="font-bold text-gray-800">{displayName}</h3>
      <p className="text-sm text-gray-500">{email}</p>

      {/* 🔴 লগআউট বাটন */}
      <button
        onClick={async () => {
          setIsOpen(false);
          await logout(); // 🟢 সরাসরি গ্লোবাল মেথড রান হবে
        }}
        className="mt-4 w-full flex items-center justify-center gap-2 btn"
      >
        <HiOutlineLogout /> Log Out
      </button>
    </div>
  );
}
