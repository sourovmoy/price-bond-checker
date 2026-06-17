import React from "react";
import error from "../../../assets/animation/error-page.json";
import Lottie from "lottie-react";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const Error = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Link className="flex items-center gap-2 mt-2" to="/">
          <FaArrowLeft /> Go Home
        </Link>
        <div className="w-64 h-64">
          {/* 3. উইডথ ও হাইট কন্ট্রোল করার জন্য পেরেন্ট ডিভ ব্যবহার করুন */}
          <Lottie
            animationData={error}
            loop={true} // অ্যানিমেশন বারবার চলবে কিনা (true/false)
            autoplay={true} // পেজ লোড হতেই অটোমেটিক চালু হবে কিনা
          />
        </div>
        <p className="mt-4 text-gray-600 font-medium">
          Loading, please wait...
        </p>
      </div>
    </>
  );
};

export default Error;
