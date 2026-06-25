import React from "react";
import { Link } from "react-router";

const DrawResultCard = ({ draw, formatAmount, formatDate }) => {
  const topPrizes = draw.prizes.slice(0, 4);
  const fifthPrize = draw.prizes.find((p) => p.tier === 5);
  return (
    <Link
      to={`/draw-result/${draw._id}`}
      className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-md transition-all flex flex-col justify-between"
    >
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              ড্র নং {draw.drawNumber}
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              {formatDate(draw.uploadedAt)}
            </p>
          </div>
          <span className="text-xs bg-[#E1F5EE] text-[#085041] px-3 py-1 rounded-lg font-medium mt-1">
            {draw.totalWinners} জন বিজয়ী
          </span>
        </div>

        {/* Top 4 prizes */}
        <div className="bg-gray-50 rounded-xl p-3 space-y-2 mb-3">
          {topPrizes.map((prize) => (
            <div
              key={prize.tier}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-gray-500 text-xs w-24">{prize.label}</span>
              <span className="font-semibold text-gray-800 text-xs">
                {formatAmount(prize.amount)}
              </span>
              <span className="text-xs text-gray-400">
                {prize.numbers.length} জন
              </span>
            </div>
          ))}
        </div>

        {/* 5th prize summary — numbers দেখাবে না */}
        {fifthPrize && (
          <div className="flex items-center justify-between text-xs text-gray-500 px-1 mb-3">
            <span>{fifthPrize.label}</span>
            <span className="font-medium text-gray-700">
              {formatAmount(fifthPrize.amount)} × {fifthPrize.numbers.length} জন
            </span>
          </div>
        )}
      </div>

      {/* See More Button */}
      <button className="w-full mt-2 py-2 text-sm font-semibold text-[#244B43] bg-[#E1F5EE] hover:bg-[#9FE1CB] rounded-xl transition-all">
        সব নম্বর দেখুন
      </button>
    </Link>
  );
};

export default DrawResultCard;
