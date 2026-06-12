import React from "react";
import { FaShieldAlt, FaMoneyBillWave, FaChartLine } from "react-icons/fa";

const WhyBuy = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 animate-fadeIn">
      <div className="p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="text-amber-500">🤔</span> কেন প্রাইস বন্ড কিনবেন?
        </h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          প্রাইস বন্ড কোনো সাধারণ লটারি নয়, এটি গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
          কর্তৃক নিয়ন্ত্রিত একটি ১০০% নিরাপদ সরকারি বিনিয়োগ মাধ্যম।
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-gray-100">
            <FaShieldAlt className="w-6 h-6 text-green-600 mb-2" />
            <h3 className="text-sm font-bold text-gray-800 mb-1">
              শতভাগ নিরাপদ বিনিয়োগ
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              আপনার মূল টাকা কখনোই কমবে না বা হারিয়ে যাবে না। সরকার নিজে এই
              টাকার গ্যারান্টার।
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-gray-100">
            <FaMoneyBillWave className="w-6 h-6 text-emerald-600 mb-2" />
            <h3 className="text-sm font-bold text-gray-800 mb-1">
              যেকোনো সময় ক্যাশ ব্যাক
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              আজ বন্ড কিনলে আপনি চাইলে ২ মাস বা ২ বছর পর যেকোনো দিন ব্যাংকে জমা
              দিয়ে পুরো টাকা তুলে নিতে পারবেন।
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-gray-100">
            <FaChartLine className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="text-sm font-bold text-gray-800 mb-1">
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
