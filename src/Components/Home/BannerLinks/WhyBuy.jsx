import React from "react";
import {
  FaShieldAlt,
  FaMoneyBillWave,
  FaChartLine,
  FaQuestionCircle,
} from "react-icons/fa";

const WhyBuy = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 animate-fadeIn">
      <div className="p-6">
        {/* 🤔 ইমোজি সরিয়ে এখানে FaQuestionCircle আইকনটি ব্যবহার করা হয়েছে */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2.5">
          <span className="text-amber-500 bg-amber-50 p-1.5 rounded-lg inline-flex items-center justify-center border border-amber-100">
            <FaQuestionCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          কেন প্রাইস বন্ড কিনবেন?
        </h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed pl-1">
          প্রাইস বন্ড কোনো সাধারণ লটারি নয়, এটি গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
          কর্তৃক নিয়ন্ত্রিত একটি ১০০% নিরাপদ সরকারি বিনিয়োগ মাধ্যম।
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* কার্ড ১ */}
          <div className="p-5 bg-slate-50/60 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:border-green-100 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mb-3 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
              <FaShieldAlt className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-1.5">
              শতভাগ নিরাপদ বিনিয়োগ
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              আপনার মূল টাকা কখনোই কমবে না বা হারিয়ে যাবে না। সরকার নিজে এই
              টাকার গ্যারান্টার।
            </p>
          </div>

          {/* কার্ড ২ */}
          <div className="p-5 bg-slate-50/60 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:border-emerald-100 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              <FaMoneyBillWave className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-1.5">
              যেকোনো সময় ক্যাশ ব্যাক
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              আজ বন্ড কিনলে আপনি চাইলে ২ মাস বা ২ বছর পর যেকোনো দিন ব্যাংকে জমা
              দিয়ে পুরো টাকা তুলে নিতে পারবেন।
            </p>
          </div>

          {/* কার্ড ৩ */}
          <div className="p-5 bg-slate-50/60 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:border-blue-100 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <FaChartLine className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-1.5">
              ভাগ্য পরিবর্তনের সুযোগ
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              টাকা ব্যাংকে অলস ফেলে না রেখে বন্ড কিনে রাখলে প্রতি ৩ মাস পর পর
              কোটি টাকার পুরস্কার জেতার সুযোগ থাকে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyBuy;
