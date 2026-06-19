import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiUsers, FiAward, FiXCircle, FiClock } from "react-icons/fi";
import { TbCurrencyTaka } from "react-icons/tb";
import AdminBarChart from "../../../Components/Charts/AdminBarChart";
import AdminOverviewSkeleton from "../../../Components/Skeleton/AdminOverviewSkeleton";

const AdminDashBoard = () => {
  const axios = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: async () => {
      const res = await axios.get("/admin/dashboard-stats");
      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: 3000,
  });

  const {
    totalUsers = 0,
    totalWon = 0,
    totalLost = 0,
    totalPending = 0,
    totalValue = 0,
    users = [],
    chartData = [],
  } = data || {};

  const stats = [
    {
      label: "মোট ইউজার",
      value: totalUsers,
      icon: <FiUsers />,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      label: "মোট বন্ড মূল্য",
      value: `৳${totalValue.toLocaleString("bn-BD")}`,
      icon: <TbCurrencyTaka />,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      label: "মোট বিজয়ী",
      value: totalWon,
      icon: <FiAward />,
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },
    {
      label: "মোট মেলেনি",
      value: totalLost,
      icon: <FiXCircle />,
      bg: "bg-red-50",
      text: "text-red-500",
    },
    {
      label: "অপেক্ষমান",
      value: totalPending,
      icon: <FiClock />,
      bg: "bg-gray-50",
      text: "text-gray-500",
    },
  ];

  if (isLoading) return <AdminOverviewSkeleton />;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          অ্যাডমিন ড্যাশবোর্ড
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          সমস্ত ইউজার ও বন্ডের সার্বিক চিত্র
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3"
          >
            <div
              className={`w-9 h-9 rounded-lg ${stat.bg} ${stat.text} flex items-center justify-center text-lg`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-gray-400">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.text}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          শীর্ষ ১০ ইউজার (বন্ড সংখ্যা অনুযায়ী)
        </h2>
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-300 text-sm">
            কোনো তথ্য নেই
          </div>
        ) : (
          <AdminBarChart chartData={chartData} />
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#244B43] text-white text-xs uppercase tracking-wide">
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">নাম</th>
                <th className="px-4 py-3 text-left">ইমেইল</th>
                <th className="px-4 py-3 text-center">মোট বন্ড</th>
                <th className="px-4 py-3 text-center">বিজয়ী</th>
                <th className="px-4 py-3 text-center">মেলেনি</th>
                <th className="px-4 py-3 text-center">অপেক্ষমান</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((u, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {u.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{u.email}</td>
                  <td className="px-4 py-3 text-center font-semibold text-gray-700">
                    {u.totalBonds}
                  </td>
                  <td className="px-4 py-3 text-center text-green-600 font-medium">
                    {u.won}
                  </td>
                  <td className="px-4 py-3 text-center text-red-500 font-medium">
                    {u.lost}
                  </td>
                  <td className="px-4 py-3 text-center text-yellow-600 font-medium">
                    {u.pending}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* ✅ Footer — total summary */}
            <tfoot>
              <tr className="bg-gray-50 border-t-2 border-gray-200 font-semibold">
                <td className="px-4 py-3" colSpan={3}>
                  <span className="text-gray-700">সর্বমোট</span>
                </td>
                <td className="px-4 py-3 text-center text-gray-800">
                  {users.reduce((sum, u) => sum + u.totalBonds, 0)}
                </td>
                <td className="px-4 py-3 text-center text-green-700">
                  {users.reduce((sum, u) => sum + u.won, 0)}
                </td>
                <td className="px-4 py-3 text-center text-red-600">
                  {users.reduce((sum, u) => sum + u.lost, 0)}
                </td>
                <td className="px-4 py-3 text-center text-yellow-700">
                  {users.reduce((sum, u) => sum + u.pending, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
