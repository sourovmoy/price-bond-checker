import React, { useRef, useEffect } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import useNotifications from "../../../Hooks/useNotifications";
import { FiBell } from "react-icons/fi";

export default function NotificationModal({ setIsOpen, isOpen }) {
  const dropdownRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useNotifications();

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
  const allNotifications =
    data?.pages.flatMap((page) => page.notifications) || [];
  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-5 w-80 max-h-96 overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-200"
    >
      <h3 className="text-sm font-semibold text-gray-700 mb-3">নোটিফিকেশন</h3>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-lg bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : allNotifications.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-6">
          কোনো নোটিফিকেশন নেই
        </p>
      ) : (
        <div className="space-y-2">
          {allNotifications.map((noti) => (
            <div
              key={noti._id}
              className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-green-50 text-[#244B43] flex items-center justify-center shrink-0">
                <FiBell size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-700 leading-snug">
                  {noti.message}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {new Date(noti.createdAt).toLocaleDateString("bn-BD", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full mt-3 text-xs font-medium text-[#244B43] hover:bg-gray-50 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {isFetchingNextPage ? "লোড হচ্ছে..." : "আরও দেখুন"}
        </button>
      )}
    </div>
  );
}
