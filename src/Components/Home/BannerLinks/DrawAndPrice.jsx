import React from "react";

const DrawAndPrizes = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 animate-fadeIn">
      <div className="p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="text-yellow-500">🎉</span> ড্র এর সময়সূচী ও
          পুরস্কারের বিবরণ
        </h2>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          বাংলাদেশ ব্যাংক বছরে মোট ৪ বার (প্রতি ৩ মাস পর পর) প্রাইস বন্ডের
          অফিশিয়াল ড্র বা লটারি পরিচালনা করে থাকে।
        </p>

        {/* Schedule Grid Box */}
        <div className="bg-slate-50 border border-gray-100 rounded-xl p-4 mb-6">
          <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
            📅 অফিশিয়াল ড্র এর তারিখসমূহ
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-bold text-gray-700">
            <div className="bg-white p-2 rounded-lg border border-gray-200/60">
              ৩১ জানুয়ারি
            </div>
            <div className="bg-white p-2 rounded-lg border border-gray-200/60">
              ৩০ এপ্রিল
            </div>
            <div className="bg-white p-2 rounded-lg border border-gray-200/60">
              ৩১ জুলাই
            </div>
            <div className="bg-white p-2 rounded-lg border border-gray-200/60">
              ৩১ অক্টোবর
            </div>
          </div>
        </div>

        {/* Prize structure Table */}
        <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
          🏆 পুরস্কারের স্তরবিন্যাস (প্রতি সিরিজে)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-100">
              <tr>
                <th className="p-3">পুরস্কারের ক্যাটাগরি</th>
                <th className="p-3">সংখ্যা</th>
                <th className="p-3 text-right">পুরস্কারের পরিমাণ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3 font-semibold text-green-700">
                  ১ম পুরস্কার
                </td>
                <td className="p-3">১ জন</td>
                <td className="p-3 text-right font-bold text-gray-800">
                  ৳ ৬,০০,০০০
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-800">২য় পুরস্কার</td>
                <td className="p-3">১ জন</td>
                <td className="p-3 text-right font-bold text-gray-800">
                  ৳ ৩,২৫,০০০
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-800">৩য় পুরস্কার</td>
                <td className="p-3">২ জন</td>
                <td className="p-3 text-right font-bold text-gray-800">
                  ৳ ১,০০,০০০ (প্রতিটি)
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-800">
                  ৪র্থ পুরস্কার
                </td>
                <td className="p-3">২ জন</td>
                <td className="p-3 text-right font-bold text-gray-800">
                  ৳ ৫০,০০০ (প্রতিটি)
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-gray-800">৫ম পুরস্কার</td>
                <td className="p-3">৪০ জন</td>
                <td className="p-3 text-right font-bold text-gray-800">
                  ৳ ১০,০০০ (প্রতিটি)
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
