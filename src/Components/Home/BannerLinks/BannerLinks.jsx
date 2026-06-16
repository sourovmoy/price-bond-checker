import React from "react";
// React Icons
import { FaRegQuestionCircle, FaGem, FaUniversity } from "react-icons/fa";
import { HiOutlineTrophy } from "react-icons/hi2";

const BannerLinks = ({ activeTab, setActiveTab }) => {
  const categories = [
    {
      id: 1,
      name: "Why Buy?",
      icon: (
        <FaRegQuestionCircle className="w-3 h-3 sm:w-5 sm:h-5 text-amber-600" />
      ),
    },
    {
      id: 2,
      name: "Benefits",
      icon: <FaGem className="w-3 h-3 sm:w-5 sm:h-5 text-cyan-600" />,
    },
    {
      id: 3,
      name: "How to Buy?",
      icon: <FaUniversity className="w-3 h-3 sm:w-5 sm:h-5 text-green-600" />,
    },
    {
      id: 4,
      name: "Draw & Prizes",
      icon: (
        <HiOutlineTrophy className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-600" />
      ),
    },
  ];

  return (
    <div className="relative w-full flex flex-col items-center px-4">
      {/* Floating Center Card Grid */}
      <div className="relative z-10 -mt-8 sm:-mt-10 w-full max-w-2xl bg-white border border-gray-100/80 rounded-xl shadow-lg p-1 sm:p-2.5 grid grid-cols-4 gap-1 sm:gap-3">
        {categories.map((category) => {
          const isActive = activeTab === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex flex-col items-center justify-center p-1.5 sm:p-3 rounded-lg border transition-all duration-300 focus:outline-none ${
                isActive
                  ? "border-[#244B43] bg-green-50/30 text-[#244B43] shadow-sm font-semibold"
                  : "border-gray-200/70 hover:border-gray-300 text-gray-600 hover:bg-gray-50/60 hover:scale-105"
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1 sm:mb-1.5 bg-gray-50/80 border transition-transform duration-300 ${
                  isActive
                    ? "scale-105 border-green-200 bg-white shadow-sm"
                    : "border-gray-100"
                }`}
              >
                {category.icon}
              </div>

              {/* Text Label */}
              <span
                className={`text-[10px] sm:text-xs font-bold tracking-tight text-center leading-tight whitespace-nowrap transition-colors duration-300 ${
                  isActive
                    ? "text-[#244B43]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BannerLinks;
