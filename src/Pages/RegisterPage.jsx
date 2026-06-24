import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Container from "../Components/Shared/Container/Container";
import useAuth from "../Hooks/useAuth";
import { AiOutlineLoading } from "react-icons/ai";
import { MdEmail, MdRefresh } from "react-icons/md";
import toast from "react-hot-toast";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";
import { useImageUpload } from "../Hooks/useImageUpload";
import { useNavigate } from "react-router";
import Loading from "../Components/Loading/Loading";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FiEye, FiEyeOff } from "react-icons/fi";
import GoogleBtn from "../Components/Shared/GoogleBtn/GoogleBtn";

const RegisterPage = () => {
  const { createUser, updateUserProfile, verifyEmail, auth, loading } =
    useAuth();
  const axios = useAxiosSecure();
  const [spinner, setSpinner] = useState(false);
  const [resendSpinner, setResendSpinner] = useState(false);
  const [isWaitingForVerify, setIsWaitingForVerify] = useState(false);
  const { uploadImage } = useImageUpload();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // ব্যাকগ্রাউন্ড টাইমার বা ইন্টারভাল ট্র্যাক করার জন্য রেফারেন্স
  const intervalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // 🎯 ✨ [বেস্ট প্র্যাকটিস লজিক] ব্যাকগ্রাউন্ডে অটোমেটিক ভেরিফিকেশন চেক (Polling)
  useEffect(() => {
    if (isWaitingForVerify && auth.currentUser) {
      // প্রতি ৩ সেকেন্ড পর পর ফায়ারবেসকে রিফ্রেশ করে চেক করবে ইউজার মেইলে ক্লিক করেছে কিনা
      intervalRef.current = setInterval(async () => {
        try {
          await auth.currentUser.reload(); // ফায়ারবেস লেটেস্ট স্টেট রিফ্রেশ
          await auth.currentUser.getIdToken(true);
          if (auth.currentUser.emailVerified) {
            toast.success("আপনার ইমেইল সফলভাবে ভেরিফাইড হয়েছে!");

            clearInterval(intervalRef.current); // টাইমার স্টপ
            setIsWaitingForVerify(false);

            navigate("/"); // অটোমেটিক হোম পেজে রিডাইরেক্ট (কোনো লগইন ছাড়াই)
          }
        } catch (error) {}
      }, 5000);
    }

    // মেমোরি লিক আটকাতে কম্পোনেন্ট বন্ধ হলে টাইমার ক্লিয়ার করা
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isWaitingForVerify, auth.currentUser, navigate]);

  // ✉️ পুনরায় ভেরিফিকেশন মেইল পাঠানোর ফাংশন
  const handleResendEmail = async () => {
    if (!auth.currentUser) return;
    setResendSpinner(true);
    try {
      await verifyEmail(auth.currentUser);
      toast.success("আবারো একটি নতুন ভেরিফিকেশন লিঙ্ক পাঠানো হয়েছে।");
    } catch (error) {
      toast.error(
        getFirebaseErrorMessage(error) || "মেইল পাঠাতে ব্যর্থ হয়েছে।",
      );
    } finally {
      setResendSpinner(false);
    }
  };

  const onSubmit = async (data) => {
    setSpinner(true);
    try {
      const { name, email, password, phone } = data;
      const formattedPhone = phone.startsWith("+88") ? phone : `+88${phone}`;

      // ১. ছবি ক্লাউডিনারিতে আপলোড
      let uploadedImageUrl = "";
      const file = data?.file?.[0];
      if (file) {
        try {
          const photo = await uploadImage(file);
          uploadedImageUrl = photo?.secureUrl || "";
        } catch (imgError) {}
      }

      const userCredential = await createUser(email, password);
      const firebaseUser = userCredential.user;

      await updateUserProfile(name, uploadedImageUrl);
      await verifyEmail(firebaseUser);
      await firebaseUser.getIdToken(true);

      const newUser = {
        name,
        phone: formattedPhone,
        imageUrl: uploadedImageUrl,
      };
      try {
        await axios.post("/user", newUser);
      } catch (err) {
        console.error("User save failed:", err.response?.data || err.message);
      }

      setIsWaitingForVerify(true);
    } catch (error) {
      toast.error(
        getFirebaseErrorMessage(error) ||
          error.message ||
          "নিবন্ধন ব্যর্থ হয়েছে",
      );
    } finally {
      setSpinner(false);
    }
  };

  if (loading) return <Loading />;

  // ✉️ ✨ আলটিমেট ইউজার ফ্রেন্ডলি ওয়েটিং স্ক্রিন UI
  if (isWaitingForVerify) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-90px)] px-4">
          <div className="w-full max-w-md p-8 border border-gray-100 rounded-2xl shadow-xl bg-white text-center space-y-5 animate-fadeIn">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 text-[#244B43]">
              <MdEmail className="text-3xl animate-bounce" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              আপনার ইমেইল চেক করুন!
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              আমরা আপনার ইমেইলে একটি লিঙ্ক পাঠিয়েছি। মেইলটি ওপেন করে লিঙ্কে
              ক্লিক করলেই **এই পেজটি অটোমেটিক লোড হয়ে আপনাকে অ্যাপে নিয়ে যাবে**।
              আপনার নতুন করে লগইন করতে হবে না।
            </p>

            {/* ব্যাকগ্রাউন্ড পোলিং স্ট্যাটাস ইন্ডিকেটর */}
            <div className="flex items-center justify-center gap-2 pt-2 text-xs font-medium text-gray-500 bg-gray-50 py-2.5 rounded-xl border border-gray-100">
              <AiOutlineLoading className="animate-spin text-base text-[#244B43]" />
              আপনার ভেরিফিকেশনের জন্য অপেক্ষা করা হচ্ছে...
            </div>

            {/* রিমেইল অপশন (যদি মেইল না এসে থাকে) */}
            <div className="pt-2 border-t border-gray-100 text-center">
              <span className="text-xs text-gray-500">মেইল পাননি? </span>
              <button
                onClick={handleResendEmail}
                disabled={resendSpinner}
                className="text-xs font-bold text-[#244B43] hover:text-[#446E65] inline-flex items-center gap-1 disabled:opacity-50"
              >
                {resendSpinner ? (
                  "পাঠানো হচ্ছে..."
                ) : (
                  <>
                    আবার পাঠান <MdRefresh className="text-sm" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  // ডিফল্ট রেজিস্ট্রেশন ফর্ম UI
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-2 px-1 md:px-4 overflow-hidden">
        <div className="w-full max-w-md p-5 border border-gray-100 rounded-2xl shadow-xl bg-white">
          <h2 className="mb-4 text-xl sm:text-2xl font-extrabold text-gray-800 tracking-tight text-center">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h2>

          <form className="space-y-3.5 pb-3" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-0.5">
                আপনার সম্পূর্ণ নাম
              </label>
              <input
                type="text"
                className="block w-full px-3.5 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all"
                placeholder="যেমন: Jon Leo"
                {...register("name", { required: "আপনার নাম দেওয়া আবশ্যক" })}
              />
              {errors.name && (
                <p className="text-red-500 text-[10px] mt-0.5">
                  ⚠️ {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-0.5">
                ইমেইল অ্যাড্রেস
              </label>
              <input
                type="email"
                className="block w-full px-3.5 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all"
                placeholder="example@email.com"
                {...register("email", {
                  required: "ইমেইল দেওয়া আবশ্যক",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "সঠিক ইমেইল ফরম্যাট দিন",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-[10px] mt-0.5">
                  ⚠️ {errors.email.message}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-0.5">
                মোবাইল নাম্বার
              </label>
              <input
                type="tel"
                className="block w-full px-3.5 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all"
                placeholder="01XXXXXXXXX"
                {...register("phone", {
                  required: "মোবাইল নাম্বার দেওয়া আবশ্যক",
                  minLength: { value: 11, message: "কমপক্ষে ১১ ডিজিট হতে হবে" },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-[10px] mt-0.5">
                  ⚠️ {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-0.5">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full px-3.5 py-1.5 pr-10 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "পাসওয়ার্ড দেওয়া আবশ্যক",
                    minLength: {
                      value: 6,
                      message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[10px] mt-0.5">
                  ⚠️ {errors.password.message}
                </p>
              )}
            </div>

            {/* Profile Photo */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-0.5">
                প্রোফাইল ছবি
              </label>
              <input
                type="file"
                className="block w-full px-3 py-1 text-xs text-gray-500 border border-gray-300 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                accept="image/*"
                {...register("file", {
                  required: "একটি প্রোফাইল ছবি সিলেক্ট করুন",
                })}
              />
              {errors.file && (
                <p className="text-red-500 text-[10px] mt-0.5">
                  ⚠️ {errors.file.message}
                </p>
              )}
            </div>

            <button
              className="w-full mt-2 font-semibold text-white py-2 rounded-xl transition-all shadow-md bg-gradient-to-br from-[#244B43] to-[#446E65] hover:brightness-110 disabled:opacity-50 text-xs sm:text-sm flex items-center justify-center gap-2"
              type="submit"
              disabled={spinner}
            >
              {spinner ? (
                <>
                  অ্যাকাউন্ট তৈরি হচ্ছে...{" "}
                  <AiOutlineLoading className="animate-spin text-base" />
                </>
              ) : (
                "নিবন্ধন করুন"
              )}
            </button>
          </form>
          {/* Google btn */}
          <GoogleBtn />

          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <span className="text-xs text-gray-500">
              ইতিমধ্যে অ্যাকাউন্ট রয়েছে?{" "}
            </span>
            <button
              onClick={() => navigate("/login")}
              className="text-xs font-bold text-[#244B43] hover:text-[#446E65]"
            >
              লগ-ইন করুন
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;
