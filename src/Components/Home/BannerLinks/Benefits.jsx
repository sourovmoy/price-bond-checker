import React from "react";
import { LuGem, LuScale, LuCalendarHeart, LuTrophy } from "react-icons/lu";

const Benefits = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 animate-fadeIn">
      <div className="p-6">
        {/* টাইটেল সেকশন: এখানে 💎 এর বদলে LuGem আইকন ব্যবহার করা হয়েছে */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2.5">
          <span className="text-cyan-500 p-1.5 bg-cyan-50 rounded-lg inline-flex items-center justify-center">
            <LuGem className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          প্রাইস বন্ডের সুবিধাসমূহ
        </h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed pl-1">
          অন্যান্য যেকোনো সঞ্চয়পত্র বা ফিক্সড ডিপোজিটের তুলনায় প্রাইস বন্ডের
          কিছু অনন্য ও চমৎকার সুবিধা রয়েছে।
        </p>

        <div className="space-y-4">
          {/* সুবিধা ১: ট্যাক্স ও আইনি বিষয়ের জন্য LuScale আইকন */}
          <div className="flex gap-4 p-4 bg-cyan-50/30 border border-cyan-100/70 rounded-xl transition-all duration-200 hover:shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-700 shrink-0">
              <LuScale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">
                আয়কর মুক্ত পুরস্কারের টাকা
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                উৎস কর (২০%) সরকারি নিয়ম অনুযায়ী কেটে রেখে বাকি পুরো
                পুরস্কারের টাকা সরাসরি আপনাকে দিয়ে দেওয়া হয়। বাড়তি কোনো
                ট্যাক্স ঝামেলা নেই।
              </p>
            </div>
          </div>

          {/* সুবিধা ২: লাইফটাইম বা আজীবন মেয়াদের জন্য LuCalendarHeart আইকন */}
          <div className="flex gap-4 p-4 bg-emerald-50/30 border border-emerald-100/70 rounded-xl transition-all duration-200 hover:shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <LuCalendarHeart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">
                কোনো প্রকার এক্সপায়ারি ডেট নেই
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                একটি প্রাইস বন্ডের মেয়াদ আজীবন। যতদিন বন্ডটি আপনার কাছে থাকবে,
                প্রতি বছর ৪ বার অনুষ্ঠিত ড্র-তে বন্ডটি স্বয়ংক্রিয়ভাবে
                অনুল্লেখিত বা অন্তর্ভুক্ত থাকবে।
              </p>
            </div>
          </div>

          {/* সুবিধা ৩: বারবার পুরস্কার জেতার জন্য LuTrophy আইকন */}
          <div className="flex gap-4 p-4 bg-amber-50/30 border border-amber-100/70 rounded-xl transition-all duration-200 hover:shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <LuTrophy className="w-5 h-5" />
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
