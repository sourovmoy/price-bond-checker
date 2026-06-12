import React from "react";

const HowToBuy = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 animate-fadeIn">
      <div className="p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="text-green-600">🏦</span> কিভাবে এবং কোথা থেকে
          কিনবেন?
        </h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          বাংলাদেশী প্রাইজ বন্ড (১০০ টাকা মূল্যমানের) কেনা এবং ভাঙানো সম্পূর্ণ
          কাগজি ও সহজ প্রক্রিয়া।
        </p>

        {/* Timeline Steps */}
        <div className="relative border-l border-gray-200 ml-3 space-y-6">
          <div className="relative pl-6">
            <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-green-600 border-4 border-white shadow"></div>
            <h3 className="text-sm font-bold text-gray-850">
              ১. অনুমোদিত কাউন্টারে যান
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              বাংলাদেশ ব্যাংকের যেকোনো শাখা, যেকোনো বাণিজ্যিক ব্যাংক (যেমন:
              সোনালী, ব্র্যাক, ডাচ-বাংলা) অথবা আপনার নিকটস্থ পোস্ট অফিসে যান।
            </p>
          </div>

          <div className="relative pl-6">
            <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-green-600 border-4 border-white shadow"></div>
            <h3 className="text-sm font-bold text-gray-850">
              ২. নগদ টাকা দিয়ে বন্ড সংগ্রহ করুন
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              প্রতিটি বন্ডের সরকারি মূল্য ১০০ টাকা। কাউন্টারে নগদ টাকা জমা দিয়ে
              সরাসরি বন্ডের মূল কপি সংগ্রহ করুন। বন্ড কেনার জন্য কোনো অ্যাকাউন্ট
              খোলার প্রয়োজন নেই।
            </p>
          </div>

          <div className="relative pl-6">
            <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-green-600 border-4 border-white shadow"></div>
            <h3 className="text-sm font-bold text-gray-850">
              ৩. সিরিজ এবং নাম্বার মিলিয়ে নিন
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              বন্ডটি হাতে পাওয়ার পর প্রথম ২ অক্ষরের বাংলা সিরিজ (যেমন: কখ, খট)
              এবং শেষের ৭টি ডিজিটাল নাম্বার স্পষ্ট আছে কিনা তা যাচাই করে নিন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToBuy;
