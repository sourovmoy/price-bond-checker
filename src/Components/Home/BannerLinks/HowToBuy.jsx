import React from "react";
import {
  FaStore,
  FaWalking,
  FaMoneyBillWave,
  FaSearchPlus,
} from "react-icons/fa";

const HowToBuy = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 animate-fadeIn">
      <div className="p-6">
        {/* 🏦 ইমোজি সরিয়ে এখানে FaStore আইকন ব্যবহার করা হয়েছে */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2.5">
          <span className="text-emerald-600 bg-emerald-50 p-1.5 rounded-lg inline-flex items-center justify-center border border-emerald-100">
            <FaStore className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          কিভাবে এবং কোথা থেকে কিনবেন?
        </h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed pl-1">
          বাংলাদেশী প্রাইজ বন্ড (১০০ টাকা মূল্যমানের) কেনা এবং ভাঙানো সম্পূর্ণ
          কাগজি ও সহজ প্রক্রিয়া।
        </p>

        {/* Timeline Steps */}
        <div className="relative border-l-2 border-emerald-100 ml-4 space-y-8">
          {/* স্টেপ ১ */}
          <div className="relative pl-8">
            {/* সাধারণ ডটের জায়গায় মডার্ন আইকন */}
            <div className="absolute -left-[15px] top-0.5 w-7 h-7 rounded-full bg-emerald-600 border-4 border-white shadow-sm flex items-center justify-center text-white">
              <FaWalking className="w-3 h-3" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">
              ১. অনুমোদিত কাউন্টারে যান
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              বাংলাদেশ ব্যাংকের যেকোনো শাখা, যেকোনো বাণিজ্যিক ব্যাংক (যেমন:
              সোনালী, ব্র্যাক, ডাচ-বাংলা) অথবা আপনার নিকটস্থ পোস্ট অফিসে যান।
            </p>
          </div>

          {/* স্টেপ ২ */}
          <div className="relative pl-8">
            <div className="absolute -left-[15px] top-0.5 w-7 h-7 rounded-full bg-emerald-600 border-4 border-white shadow-sm flex items-center justify-center text-white">
              <FaMoneyBillWave className="w-3 h-3" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">
              ২. নগদ টাকা দিয়ে বন্ড সংগ্রহ করুন
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              প্রতিটি বন্ডের সরকারি মূল্য ১০০ টাকা। কাউন্টারে নগদ টাকা জমা দিয়ে
              সরাসরি বন্ডের মূল কপি সংগ্রহ করুন। বন্ড কেনার জন্য কোনো অ্যাকাউন্ট
              খোলার প্রয়োজন নেই।
            </p>
          </div>

          {/* স্টেপ ৩ */}
          <div className="relative pl-8">
            <div className="absolute -left-[15px] top-0.5 w-7 h-7 rounded-full bg-emerald-600 border-4 border-white shadow-sm flex items-center justify-center text-white">
              <FaSearchPlus className="w-3 h-3" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">
              ৩. সিরিজ এবং নাম্বার মিলিয়ে নিন
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              বন্ডটি হাতে পাওয়ার পর প্রথম ২ অক্ষরের বাংলা সিরিজ (যেমন: কখ, খট)
              এবং শেষের ৭টি ডিজিটাল নাম্বার স্পষ্ট আছে কিনা তা যাচাই করে নিন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToBuy;
