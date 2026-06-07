import React from "react";
import loadingAnimation from "../../assets/spinner_annimation.json";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-64 h-64">
        {/* 3. উইডথ ও হাইট কন্ট্রোল করার জন্য পেরেন্ট ডিভ ব্যবহার করুন */}
        <Lottie
          animationData={loadingAnimation}
          loop={true} // অ্যানিমেশন বারবার চলবে কিনা (true/false)
          autoplay={true} // পেজ লোড হতেই অটোমেটিক চালু হবে কিনা
        />
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
