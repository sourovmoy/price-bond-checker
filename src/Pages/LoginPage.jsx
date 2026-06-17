import React from "react";
import { useForm } from "react-hook-form";
import Container from "../Components/Shared/Container/Container";
import useAuth from "../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import Loading from "../Components/Loading/Loading";
import toast from "react-hot-toast";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";

const LoginPage = () => {
  const { signIn, loading, verifyEmail } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const res = await signIn(email, password);

      if (!res.user.emailVerified) {
        // ✅ verify না হলে verify screen এ পাঠাও
        toast.error("আপনার ইমেইল এখনো ভেরিফাই হয়নি। ইমেইল চেক করুন।");
        await verifyEmail(res.user); // আবার verification mail পাঠাও
        navigate("/verify-email"); // অথবা একটা verify waiting page এ পাঠাও
        return;
      }

      navigate("/");
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error) || "লগইন ব্যর্থ হয়েছে");
    }
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <div className="flex flex-col items-center justify-center hover:pointer-coarse">
        <div className="flex mt-3 md:mt-5 mb-3">
          <div className="w-full max-w-md p-8 border border-gray-100 rounded-lg shadow-md">
            <h2 className="mb-6 text-3xl font-semibold text-gray-900">
              আপনার অ্যাকাউন্টে প্রবেশ করুন
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  ইমেইল অ্যাড্রেস
                </label>
                <input
                  type="email"
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="email@example.com"
                  {...register("email", {
                    required: "ইমেইল দেওয়া আবশ্যক",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "সঠিক ইমেইল ফরম্যাট দিন",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    পাসওয়ার্ড
                  </label>
                </div>
                <input
                  type="password"
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "পাসওয়ার্ড দেওয়া আবশ্যক",
                    minLength: {
                      value: 6,
                      message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <button className="btn w-full" type="submit">
                  লগ-ইন করুন
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">অ্যাকাউন্ট নেই? </span>
              <Link
                to={"/register"}
                className="text-sm font-medium text-green-600 hover:text-green-500"
              >
                নিবন্ধন করুন
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
