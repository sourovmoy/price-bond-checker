import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import MyBondsSkeleton from "../../../Components/Skeleton/MyBondsSkeleton";

const MyBonds = () => {
  const axios = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["myBonds", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get("/my-price-bond");
      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: 3000,
  });

  const bonds = data?.PriceBond || [];

  const getBadge = (result) => {
    if (result === "won")
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          বিজয়ী
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600">
        অপেক্ষমান
      </span>
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) return <MyBondsSkeleton />;

  if (bonds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-sm gap-2">
        <p>আপনার কোনো প্রাইজ বন্ড নেই।</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-gray-800">আমার বন্ডসমূহ</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          মোট {bonds.length}টি বন্ড পাওয়া গেছে
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#244B43] text-white text-xs uppercase tracking-wide">
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">বন্ড নম্বর</th>
                <th className="px-4 py-3 text-left">যোগের তারিখ</th>
                <th className="px-4 py-3 text-left">অবস্থা</th>
                <th className="px-4 py-3 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bonds.map((bond, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-mono font-medium text-gray-800 tracking-wider">
                    {bond.number}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {formatDate(bond.addedAt)}
                  </td>
                  <td className="px-4 py-3">{getBadge(bond.result)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                        title="সম্পাদনা"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                        title="মুছুন"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBonds;
