import React from "react";

const MyBondsSkeleton = () => {
  return (
    <div className="p-4 sm:p-6">
      {/* Header skeleton */}
      <div className="mb-5 space-y-2">
        <div className="h-5 w-36 rounded bg-gray-200 animate-pulse" />
        <div className="h-3.5 w-48 rounded bg-gray-100 animate-pulse" />
      </div>

      {/* Table skeleton */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="bg-[#244B43] px-4 py-3 grid grid-cols-[50px_1fr_1fr_1fr_100px] gap-4 items-center">
          {["w-4", "w-20", "w-24", "w-16", "w-14 ml-auto"].map((w, i) => (
            <div
              key={i}
              className={`h-3 rounded bg-white/20 animate-pulse ${w}`}
            />
          ))}
        </div>

        {/* Table rows */}
        <div className="divide-y divide-gray-50">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              // 🟢 রিয়েল টেবিলের কলাম উইডথের সাথে ম্যাচ করতে grid-cols রি-ডিফাইন করা হয়েছে
              className="px-4 py-3 grid grid-cols-[50px_1fr_1fr_1fr_100px] gap-4 items-center"
              style={{ opacity: 1 - i * 0.08 }} // চমৎকার ফেড-আউট ইফেক্ট
            >
              {/* # ১. সিরিয়াল নম্বর */}
              <div className="h-3 w-4 rounded bg-gray-100 animate-pulse" />

              {/* 🎟️ ২. বন্ড নম্বর */}
              <div className="h-3.5 w-24 sm:w-28 rounded bg-gray-200 animate-pulse" />

              {/* 📅 ৩. যোগের তারিখ (নতুন যোগ করা কলাম) */}
              <div className="h-3 w-20 sm:w-24 rounded bg-gray-100 animate-pulse" />

              {/* ⏳ ৪. অবস্থা (Badge) */}
              <div className="h-6 w-16 rounded-full bg-gray-100 animate-pulse" />

              {/* 🛠️ ৫. অ্যাকশন বাটনসমূহ */}
              <div className="flex justify-end gap-2">
                <div className="h-7 w-7 rounded-lg bg-blue-50/50 bg-gray-100 animate-pulse" />
                <div className="h-7 w-7 rounded-lg bg-red-50/50 bg-gray-100 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBondsSkeleton;
