import React from "react";

const AllPricebondsSkeleton = ({ length = 4 }) => {
  // প্রপ্স হিসেবে আসা length অনুযায়ী ডামি অ্যারে তৈরি করা
  const skeletonCards = Array.from({ length: length });

  return (
    <div className="p-4 sm:p-6 bg-gray-50/50 min-h-screen">
      {/* হেডার সেকশন স্কেলিটন */}
      <div className="mb-6 space-y-2 animate-pulse">
        <div className="h-6 w-56 bg-gray-200 rounded-lg" />
        <div className="h-4 w-40 bg-gray-100 rounded-md" />
      </div>

      {/* 🟢 ইউজার কার্ড গ্রিড (আপনার অরিজিনাল গ্রিডের সাথে হুবহু মিল রাখা হয়েছে) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between h-[210px] animate-pulse"
          >
            {/* উপরের কন্টেন্ট সেকশন */}
            <div className="space-y-4">
              {/* ছবি এবং নামের স্কেলিটন */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-gray-50">
                {/* প্রোফাইল ফটো রাউন্ড বক্স */}
                <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />

                {/* নাম ও বন্ড কাউন্ট ব্যাজ */}
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="h-5 w-16 bg-gray-100 rounded-md" />
                </div>
              </div>

              {/* যোগাযোগের তথ্য (ইমেইল ও ফোন) স্কেলিটন */}
              <div className="space-y-3 py-1">
                {/* ইমেইল লাইন */}
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 bg-gray-100 rounded-full shrink-0" />
                  <div className="h-3.5 w-5/6 bg-gray-150 bg-gray-100 rounded" />
                </div>

                {/* ফোন নম্বর লাইন */}
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 bg-gray-100 rounded-full shrink-0" />
                  <div className="h-3.5 w-1/2 bg-gray-100 rounded" />
                </div>
              </div>
            </div>

            {/* নিচের অ্যাকশন বাটন স্কেলিটন */}
            <div className="pt-2">
              <div className="w-full h-9 bg-gray-100 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPricebondsSkeleton;
