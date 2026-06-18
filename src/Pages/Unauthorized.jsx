import React from "react";
import { useNavigate } from "react-router";
import { FiLock, FiHome, FiLogIn } from "react-icons/fi";
import { MdOutlineShieldMoon } from "react-icons/md";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md w-full">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mx-auto mb-6">
          <FiLock className="text-4xl text-gray-400" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-100 rounded-lg px-3 py-1 mb-5">
          <MdOutlineShieldMoon className="text-red-500 text-sm" />
          <span className="text-xs font-medium text-red-500">
            অননুমোদিত প্রবেশ
          </span>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          এই পেজে প্রবেশের অনুমতি নেই
        </h1>

        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          আপনার অ্যাকাউন্টে এই পেজটি দেখার অনুমতি নেই। সঠিক অ্যাকাউন্টে লগইন
          করুন অথবা হোমে ফিরে যান।
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#244B43] text-white text-sm font-medium hover:brightness-110 transition-all"
          >
            <FiHome size={16} />
            হোমে যান
          </button>
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all"
          >
            <FiLogIn size={16} />
            লগইন করুন
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-8">
          সমস্যা হলে অ্যাডমিনের সাথে যোগাযোগ করুন।
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
