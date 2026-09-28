import React from "react";
import Container from "../Components/Shared/Container/Container";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading/Loading";
import { Outlet } from "react-router";

const AddPriceBond = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="max-w-5xl mx-auto py-10 animate-fadeIn">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            নতুন প্রাইজ বন্ড যুক্ত করুন
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            আপনার প্রাইজ বন্ডের নাম্বারটি নিরাপদে সংরক্ষণ করুন, যেন ড্র-এর ফলাফল
            প্রকাশের সাথে সাথে স্বয়ংক্রিয়ভাবে চেক করা যায়।
          </p>
        </div>

        {/* Responsive Grid Layout */}
      </div>
      <Outlet />
    </Container>
  );
};

export default AddPriceBond;
