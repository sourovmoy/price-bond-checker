import React from "react";
import { FaCalendarAlt, FaTrophy, FaCalendarCheck } from "react-icons/fa";

const DrawAndPrizes = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 animate-fadeIn">
      <div className="p-6">
        {/* 🎉 ইমোজি সরিয়ে FaCalendarAlt আইকন ব্যবহার করা হয়েছে */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2.5">
          <span className="text-amber-500 bg-amber-50 p-1.5 rounded-lg inline-flex items-center justify-center border border-amber-100">
            <FaCalendarAlt className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          ড্র এর সময়সূচী ও পুরস্কারের বিবরণ
        </h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed pl-1">
          বাংলাদেশ ব্যাংক বছরে মোট ৪ বার (প্রতি ৩ মাস পর পর)プライス বন্ডের
          অফিশিয়াল ড্র বা লটারি পরিচালনা করে থাকে।
        </p>

        {/* Schedule Grid Box */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mb-6">
          {/* 📅 ইমোজি সরিয়ে FaCalendarCheck আইকন ব্যবহার করা হয়েছে */}
          <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-3 flex items-center gap-1.5">
            <FaCalendarCheck className="w-3.5 h-3.5 text-slate-400" />
            অফিশিয়াল ড্র এর তারিখসমূহ
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-bold text-gray-700">
            <div className="bg-white p-2.5 rounded-lg border border-gray-200/60 shadow-sm">
              ৩১ জানুয়ারি
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-gray-200/60 shadow-sm">
              ৩০ এপ্রিল
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-gray-200/60 shadow-sm">
              ৩১ জুলাই
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-gray-200/60 shadow-sm">
              ৩১ অক্টোবর
            </div>
          </div>
        </div>

        {/* Prize structure Table */}
        {/* 🏆 ইমোজি সরিয়ে FaTrophy আইকন ব্যবহার করা হয়েছে */}
        <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-3 flex items-center gap-1.5 pl-1">
          <FaTrophy className="w-3.5 h-3.5 text-slate-400" />
          পুরস্কারের স্তরবিন্যাস (প্রতি সিরিজে)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm bg-white">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-100">
              <tr>
                <th className="p-3.5 pl-4">পুরস্কারের ক্যাটাগরি</th>
                <th className="p-3.5">সংখ্যা</th>
                <th className="p-3.5 text-right pr-4">পুরস্কারের পরিমাণ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3.5 pl-4 font-semibold text-emerald-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  ১ম পুরস্কার
                </td>
                <td className="p-3.5 text-gray-700">১ জন</td>
                <td className="p-3.5 text-right font-bold text-gray-900 pr-4">
                  ৳ ৬,০০,০০০
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3.5 pl-4 font-semibold text-gray-800">
                  ২য় পুরস্কার
                </td>
                <td className="p-3.5 text-gray-700">১ জন</td>
                <td className="p-3.5 text-right font-bold text-gray-900 pr-4">
                  ৳ ৩,২৫,০০০
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3.5 pl-4 font-semibold text-gray-800">
                  ৩য় পুরস্কার
                </td>
                <td className="p-3.5 text-gray-700">২ জন</td>
                <td className="p-3.5 text-right font-bold text-gray-900 pr-4">
                  ৳ ১,০০,০০০{" "}
                  <span className="text-[10px] font-normal text-gray-400">
                    (প্রতিটি)
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3.5 pl-4 font-semibold text-gray-800">
                  ৪র্থ পুরস্কার
                </td>
                <td className="p-3.5 text-gray-700">২ জন</td>
                <td className="p-3.5 text-right font-bold text-gray-900 pr-4">
                  ৳ ৫০,০০০{" "}
                  <span className="text-[10px] font-normal text-gray-400">
                    (প্রতিটি)
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3.5 pl-4 font-semibold text-gray-800">
                  ৫ম পুরস্কার
                </td>
                <td className="p-3.5 text-gray-700">৪০ জন</td>
                <td className="p-3.5 text-right font-bold text-gray-900 pr-4">
                  ৳ ১০,০০০{" "}
                  <span className="text-[10px] font-normal text-gray-400">
                    (প্রতিটি)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DrawAndPrizes;
