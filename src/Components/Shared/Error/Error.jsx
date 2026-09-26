import React from "react";
import error from "../../../assets/animation/error-page.json";
import Lottie from "lottie-react";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const Error = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-center font-medium pb-10">
          পেজটি খুঁজে পাওয়া যায়নি
        </p>
        <Link className="flex items-center gap-2 mt-2" to="/">
          <FaArrowLeft /> Go Home
        </Link>
        <div className="w-64 h-64">
          <Lottie animationData={error} loop={true} autoplay={true} />
        </div>
        <p className="mt-4 text-gray-600 font-medium">
          Loading, please wait...
        </p>
      </div>
    </>
  );
};

export default Error;
