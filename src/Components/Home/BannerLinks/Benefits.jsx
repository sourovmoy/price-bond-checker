import React from "react";
import { FaPercent, FaHandHoldingUsd, FaAward } from "react-icons/fa";

const Benefits = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 animate-fadeIn">
      <div className="p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="text-cyan-500">💎</span> প্রাইস বন্ডের সুবিধাসমূহ
        </h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          অন্যান্য যেকোনো সঞ্চয়পত্র বা ফিক্সড ডিপোজিটের তুলনায় প্রাইস বন্ডের
          কিছু অনন্য ও চমৎকার সুবিধা রয়েছে।
        </p>

        <div className="space-y-4">
          <div className="flex gap-4 p-3.5 bg-cyan-50/20 border border-cyan-100/50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-700 shrink-0">
              <FaPercent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">
                আয়কর মুক্ত পুরস্কারের টাকা
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                উৎস কর (২০%) সরকারি নিয়ম অনুযায়ী কেটে রেখে বাকি পুরো পুরস্কারের
                টাকা সরাসরি আপনাকে দিয়ে দেওয়া হয়। বাড়তি কোনো ট্যাক্স ঝামেলা নেই।
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-3.5 bg-emerald-50/20 border border-emerald-100/50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <FaHandHoldingUsd className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">
                কোনো প্রকার এক্সপায়ারি ডেট নেই
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                একটি প্রাইস বন্ডের মেয়াদ আজীবন। যতদিন বন্ডটি আপনার কাছে থাকবে,
                প্রতি বছর ৪ বার অনুষ্ঠিত ড্র-তে বন্ডটি স্বয়ংক্রিয়ভাবে
                অন্তর্ভুক্ত থাকবে।
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-3.5 bg-yellow-50/20 border border-yellow-100/50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-700 shrink-0">
              <FaAward className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">
                একই বন্ডে বারবার পুরস্কার জেতার সুযোগ
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                যদি আপনার বন্ডটি একবার পুরস্কার জেতেও, তবুও সেটি বাতিল হবে না।
                পরবর্তী ড্র-তে ওই একই নাম্বার আবারো পুরস্কার জিততে পারে!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
