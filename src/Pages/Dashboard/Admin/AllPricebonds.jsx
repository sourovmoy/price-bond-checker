import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiMail, FiPhone, FiChevronRight, FiUser } from "react-icons/fi";
import { AiOutlineLoading } from "react-icons/ai";
import AllPricebondsSkeleton from "../../../Components/Skeleton/AllPricebondsSkeleton";
import { Link } from "react-router";

const AllPricebonds = () => {
  const axios = useAxiosSecure();

  // 🎯 সব ইউজার এবং তাদের বন্ডের ডেটা ফেচ করার কুয়েরি
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminAllUsersBonds"],
    queryFn: async () => {
      const res = await axios.get("/admin/all-users-bonds");
      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: 3000,
  });

  if (isError) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>ডেটা লোড করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।</p>
      </div>
    );
  }

  if (isLoading) return <AllPricebondsSkeleton />;

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-sm gap-2">
        <span className="text-4xl">👥</span>
        <p>কোনো ইউজার পাওয়া যায়নি।</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50/50 min-h-screen">
      {/* হেডার সেকশন */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          সকল ইউজারের প্রাইজবন্ড
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          সর্বমোট {users.length} জন ইউজার নিবন্ধিত আছেন
        </p>
      </div>

      {/* 🟢 ইউজার কার্ড গ্রিড (সব সাইজের স্ক্রিনের জন্য রেসপনসিভ) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {users.map((user, index) => (
          <div
            key={user._id || index}
            // 🎯 'flex flex-col justify-between' নিশ্চিত করবে সব কার্ডের হাইট এবং বাটনের পজিশন সমান থাকবে
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-all duration-200"
          >
            {/* উপরের কন্টেন্ট সেকশন */}
            <div>
              {/* ছবি এবং নাম */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-gray-50">
                {user.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0">
                    <FiUser size={20} />
                  </div>
                )}

                {/* নাম (খুব বড় নাম হলে লেআউট ভাঙবে না, লাইন ক্লিপ হবে) */}
                <div className="overflow-hidden">
                  <h3
                    className="font-bold text-gray-800 text-sm sm:text-base truncate"
                    title={user.name}
                  >
                    {user.name}
                  </h3>
                  <span className="inline-flex items-center mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-medium bg-green-50 text-green-700 border border-green-100">
                    🎟️ {user.bondsCount || user.bonds?.length || 0}টি বন্ড
                  </span>
                </div>
              </div>

              {/* 🎯 যোগাযোগের তথ্য (সব কার্ডে সমান এলাইনমেন্টের জন্য নির্দিষ্ট স্পেসিফাইড গ্যাপ) */}
              <div className="py-4 space-y-2.5 text-xs sm:text-sm text-gray-500">
                {/* ইমেইল */}
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <FiMail className="text-gray-400 shrink-0" size={15} />
                  <span className="truncate" title={user.email}>
                    {user.email}
                  </span>
                </div>

                {/* ফোন নম্বর */}
                <div className="flex items-center gap-2.5">
                  <FiPhone className="text-gray-400 shrink-0" size={15} />
                  <span>{user.phone || "ফোন নম্বর নেই"}</span>
                </div>
              </div>
            </div>

            {/* নিচের অ্যাকশন বাটন */}
            <div className="pt-2">
              <Link
                to={`/dashboard/admin/user-bonds/${user._id}`}
                className="w-full bg-green-200 hover:bg-[#244B43] group text-gray-700 hover:text-white border border-gray-100 hover:border-[#244B43] py-2 px-4 rounded-xl font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5"
              >
                বন্ডসমূহ দেখুন
                <FiChevronRight
                  className="text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                  size={16}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPricebonds;
