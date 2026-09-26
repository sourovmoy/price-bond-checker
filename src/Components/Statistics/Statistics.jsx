import React from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FiUsers } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import { FaTrophy } from "react-icons/fa";
import CountUp from "react-countup";
import StatsSkeleton from "../Skeleton/StatsSkeleton";

const Statistics = () => {
  const axios = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const res = await axios.get("/statistics");
      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: 3000,
  });

  const { totalUsers = 0, totalWon = 0, totalBonds = 0 } = data || {};

  const stats = [
    {
      label: "মোট ইউজার",
      value: `${totalUsers}`,
      icon: <FiUsers />,
      text: "text-blue-600",
    },
    {
      label: "মোট বন্ড",
      value: `${totalBonds}`,
      icon: <IoTicketOutline style={{ transform: "rotate(45deg)" }} />,
      text: "text-green-600",
    },
    {
      label: "মোট বিজয়ী",
      value: `${totalWon}`,
      icon: <FaTrophy />,
      text: "text-yellow-600",
    },
  ];

  return (
    <div>
      <div className="text-center my-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
          পরিসংখ্যান <span className="text-[#244B43]">(Stats)</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          চলমান প্রতিটি মুহূর্তের তাত্ক্ষণিক পরিসংখ্যান ও বিশ্লেষণ
        </p>
      </div>
      {isLoading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-green-100 py-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="py-7 sm:p-5 transition-all duration-200 flex justify-center items-center text-center"
            >
              <div>
                <div className="flex items-center justify-center">
                  <div className={`rounded-xl ${item.text} text-3xl`}>
                    {item.icon}
                  </div>
                </div>

                <p className="mt-4 text-sm font-medium text-gray-500">
                  {item.label}
                </p>
                <h3 className="mt-1 text-3xl font-bold text-gray-800">
                  <CountUp
                    start={0}
                    end={item.value}
                    duration={2.5}
                    enableScrollSpy
                    scrollSpyDelay={200}
                    formattingFn={(val) =>
                      val
                        .toString()
                        .replace(
                          /\d/g,
                          (d) =>
                            ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"][
                              d
                            ],
                        )
                    }
                  />
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Statistics;
