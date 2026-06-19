import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { FiAward, FiTrendingUp, FiXCircle, FiClock } from "react-icons/fi";
import { TbCurrencyTaka } from "react-icons/tb";
import UserOverviewSkeleton from "../../../Components/Skeleton/UserOverviewSkeleton";
import UserPriceBondChart from "../../../Components/Charts/UserPriceBondChart";

const UserDashboard = () => {
  const axios = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboardStats", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get("/dashboard/stats");
      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: 3000,
  });

  const {
    total = 0,
    won = 0,
    lost = 0,
    pending = 0,
    totalValue = 0,
    monthlyData = [],
  } = data || {};

  const chartData = monthlyData.map((m) => ({
    month: m.month,
    বন্ড: m.count,
  }));

  const stats = [
    {
      label: "মোট বন্ড",
      value: total,
      icon: <FiTrendingUp />,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      label: "মোট মূল্য",
      value: `৳${totalValue.toLocaleString("bn-BD")}`,
      icon: <TbCurrencyTaka />,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      label: "বিজয়ী",
      value: won,
      icon: <FiAward />,
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },
    {
      label: "মেলেনি",
      value: lost,
      icon: <FiXCircle />,
      bg: "bg-red-50",
      text: "text-red-500",
    },
    {
      label: "অপেক্ষমান",
      value: pending,
      icon: <FiClock />,
      bg: "bg-gray-50",
      text: "text-gray-500",
    },
  ];

  if (isLoading) return <UserOverviewSkeleton />;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          স্বাগতম, {user?.displayName?.split(" ")[0]}
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          আপনার প্রাইজ বন্ডের সার্বিক অবস্থা
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

      {/* Chart + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            মাস অনুযায়ী বন্ড যোগের হিসাব
          </h2>
          {chartData.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-300 text-sm">
              কোনো তথ্য নেই
            </div>
          ) : (
            <UserPriceBondChart chartData={chartData} />
          )}
        </div>

        {/* Result Summary */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-700">
            ফলাফলের সারসংক্ষেপ
          </h2>

          {[
            { label: "বিজয়ী", count: won, color: "bg-green-500" },
            { label: "মেলেনি", count: lost, color: "bg-red-400" },
            { label: "অপেক্ষমান", count: pending, color: "bg-yellow-400" },
          ].map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>{item.label}</span>
                <span className="font-medium text-gray-700">
                  {item.count}টি
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full transition-all duration-500`}
                  style={{
                    width: total ? `${(item.count / total) * 100}%` : "0%",
                  }}
                />
              </div>
            </div>
          ))}

          <div className="mt-auto pt-3 border-t border-gray-50">
            <p className="text-xs text-gray-400">প্রতিটি বন্ডের মূল্য</p>
            <p className="text-lg font-bold text-[#244B43]">৳ ১০০</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
