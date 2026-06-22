import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";
import Loading from "../Components/Loading/Loading";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSpinner(true);
    try {
      const email = data?.email;
      await forgotPassword(email);
      toast.success("পাসওয়ার্ড রিসেট লিঙ্কটি আপনার ইমেইলে পাঠানো হয়েছে!");
      setTimeout(() => navigate("/login"), 3000);
      navigate("/login");
    } catch (error) {
      toast.error(
        getFirebaseErrorMessage(error) || "রিসেট ইমেইল পাঠাতে ব্যর্থ হয়েছে।",
      );
    } finally {
      setSpinner(false);
    }
  };
  if (spinner) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-90px)] px-4 bg-gray-50">
      <div className="w-full max-w-md p-8 border border-gray-100 rounded-2xl shadow-xl bg-white space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-50 text-[#244B43]">
            <MdEmail className="text-2xl" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            পাসওয়ার্ড ভুলে গেছেন?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            আপনার অ্যাকাউন্টের ইমেইল এড্রেসটি দিন। আমরা সেখানে পাসওয়ার্ড রিসেট
            করার একটি লিঙ্ক পাঠিয়ে দেব।
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              ইমেইল অ্যাড্রেস
            </label>
            <input
              type="email"
              className="block w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all"
              placeholder="example@mail.com"
              {...register("email", {
                required: "ইমেইল দেওয়া আবশ্যক",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "সঠিক ইমেইল অ্যাড্রেস দিন",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-[10px] mt-1">
                ⚠️ {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={spinner}
            className="w-full font-semibold text-white py-2.5 rounded-xl transition-all shadow-md bg-gradient-to-br from-[#244B43] to-[#446E65] hover:brightness-110 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
          >
            {spinner ? (
              <>
                লিঙ্ক পাঠানো হচ্ছে...
                <AiOutlineLoading className="animate-spin text-base" />
              </>
            ) : (
              "রিসেট লিঙ্ক পাঠান"
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-xs font-bold text-[#244B43] hover:underline"
          >
            লগইন পেজে ফিরে যান
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
