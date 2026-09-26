import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const WinningBonds = () => {
  const axios = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["win-bonds"],
    queryFn: async () => {
      const res = await axios.get("/wining-results");
      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: 3000,
  });

  const bonds = data?.result || [];
  console.log(bonds);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">বিজয়ী বন্ডসমূহ</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          মোট {bonds.length.toLocaleString("bn-BD")} টি বন্ড পুরস্কার পেয়েছে
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-500">
              <th className="px-5 py-3 font-medium">ক্রমিক</th>
              <th className="px-5 py-3 font-medium">নাম</th>
              <th className="px-5 py-3 font-medium">ইমেইল</th>
              <th className="px-5 py-3 font-medium">বন্ড নম্বর</th>
              <th className="px-5 py-3 font-medium">পুরস্কারের বিভাগ</th>
              <th className="px-5 py-3 font-medium text-right">পরিমাণ</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {isLoading &&
              [1, 2, 3, 4].map((i) => (
                <tr key={i} className="animate-pulse overflow-scroll">
                  <td className="px-5 py-4">
                    <div className="h-4 w-6 bg-gray-200 rounded" />
                  </td>
                  <td className="px-5 py-4">
                    <div className="h-4 w-28 bg-gray-200 rounded" />
                  </td>
                  <td className="px-5 py-4">
                    <div className="h-4 w-36 bg-gray-200 rounded" />
                  </td>
                  <td className="px-5 py-4">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </td>
                  <td className="px-5 py-4">
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </td>
                  <td className="px-5 py-4 flex justify-end">
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                  </td>
                </tr>
              ))}

            {!isLoading &&
              bonds.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4 text-gray-500">
                    {(index + 1).toLocaleString("bn-BD")}
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-800">
                    {item.name}
                  </td>
                  <td className="px-5 py-4 text-gray-500">{item.email}</td>
                  <td className="px-5 py-4 text-gray-700">{item.bondNumber}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700">
                      {item.prize?.label.split(" ")[0] || "—"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-green-600">
                    {item.prize?.amount
                      ? `৳${item.prize.amount.toLocaleString("bn-BD")}`
                      : "—"}
                  </td>
                </tr>
              ))}

            {!isLoading && bonds.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-gray-400"
                >
                  কোনো বিজয়ী বন্ড পাওয়া যায়নি
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WinningBonds;
