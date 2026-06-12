import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Container from "../Components/Shared/Container/Container";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";
import { useImageUpload } from "../Hooks/useImageUpload";
import { useNavigate } from "react-router";

import {
  RecaptchaVerifier,
  getAuth,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import Loading from "../Components/Loading/Loading";

const RegisterPage = () => {
  const { updateUserProfile, sendOtpToPhone, loading } = useAuth();
  const axios = useAxios();
  const [spinner, setSpinner] = useState(false);
  const { uploadImage } = useImageUpload();
  const navigate = useNavigate();

  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpCode, setOtpCode] = useState("");
  const [savedFormData, setSavedFormData] = useState(null);

  const recaptchaVerifierRef = useRef(null);
  const recaptchaElementRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  const setupRecaptcha = () => {
    const authInstance = getAuth();

    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear();
      recaptchaVerifierRef.current = null;
    }

    recaptchaVerifierRef.current = new RecaptchaVerifier(
      authInstance,
      recaptchaElementRef.current,
      {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA verified efficiently.");
        },
        "expired-callback": () => {
          toast.error("reCAPTCHA-এর মেয়াদ শেষ। দয়া করে আবার চেষ্টা করুন।");
          if (recaptchaVerifierRef.current)
            recaptchaVerifierRef.current.clear();
        },
      },
    );
  };

  const onSubmit = async (data) => {
    setSpinner(true);
    try {
      if (recaptchaElementRef.current) {
        recaptchaElementRef.current.innerHTML = "";
      }

      const formattedPhone = data.phone.startsWith("+88")
        ? data.phone
        : `+88${data.phone}`;

      setupRecaptcha();
      const appVerifier = recaptchaVerifierRef.current;

      const confResult = await sendOtpToPhone(formattedPhone, appVerifier);

      setConfirmationResult(confResult);
      setSavedFormData({ ...data, formattedPhone });

      toast.success("আপনার নাম্বারে ওটিপি (OTP) কোড পাঠানো হয়েছে!");
    } catch (error) {
      toast.error(
        getFirebaseErrorMessage(error) || "ওটিপি পাঠাতে ব্যর্থ হয়েছে",
      );
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    } finally {
      setSpinner(false);
    }
  };

  const handleVerifyAndRegister = async () => {
    if (!otpCode || otpCode.length < 6) {
      return toast.error("দয়া করে ৬ ডিজিটের সঠিক ওটিপি কোডটি লিখুন");
    }

    setSpinner(true);
    try {
      const { name, email, password, formattedPhone } = savedFormData;

      const userCredential = await confirmationResult.confirm(otpCode);
      const firebaseUser = userCredential.user;

      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
          recaptchaVerifierRef.current = null;
        } catch (e) {
          console.log("Safe cleanup caught");
        }
      }

      try {
        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(firebaseUser, credential);
      } catch (linkError) {
        if (linkError.code === "auth/email-already-in-use") {
          throw new Error(
            "এই ইমেইলটি দিয়ে অলরেডি অন্য একটি অ্যাকাউন্ট যুক্ত রয়েছে।",
          );
        }
      }

      let uploadedImageUrl = "";
      const file = savedFormData?.file?.[0];
      if (file) {
        try {
          const photo = await uploadImage(file);
          uploadedImageUrl = photo?.secureUrl || "";
        } catch (imgError) {
          console.error("Cloudinary error handled gracefully");
        }
      }

      await updateUserProfile(name, uploadedImageUrl);

      const newUser = {
        name,
        email,
        phone: formattedPhone,
        imageUrl: uploadedImageUrl,
      };

      await axios.post("/user", newUser);

      toast.success("সফলভাবে অ্যাকাউন্ট তৈরি ও ভেরিফিকেশন সম্পন্ন হয়েছে!");
      navigate("/");
    } catch (error) {
      console.error("❌ Verification/Registration Error:", error);
      toast.error(
        getFirebaseErrorMessage(error) ||
          error.message ||
          "নিবন্ধন ব্যর্থ হয়েছে",
      );
    } finally {
      setSpinner(false);
    }
  };

  if (loading || spinner) return <Loading />;

  return (
    <Container>
      <div id="recaptcha-container" className="hidden">
        <div ref={recaptchaElementRef}></div>
      </div>

      {/* 🚀 py-2 এবং h-[calc(100vh-80px)] দিয়ে ফুল স্ক্রিন ফিট নিশ্চিত করা হয়েছে (প্রয়োজনে হেডার সাইজ অনুযায়ী ৮০ পিক্সেল পরিবর্তন করতে পারেন) */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-90px)] py-2 px-1 md:px-4 overflow-hidden animate-fadeIn">
        <div className="w-full max-w-md p-5 border border-gray-100 rounded-2xl shadow-xl bg-white">
          {!confirmationResult ? (
            <>
              {/* mb-2 দিয়ে হেডিং এর নিচের স্পেস কমানো হয়েছে */}
              <h2 className="mb-2 text-xl sm:text-2xl font-extrabold text-gray-800 tracking-tight text-center">
                নতুন অ্যাকাউন্ট তৈরি করুন
              </h2>

              {/* space-y-2.5 দিয়ে প্রতিটা ইনপুটের মাঝের ফাঁকা অংশ কম করা হয়েছে */}
              <form className="space-y-2.5" onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-0.5">
                    আপনার সম্পূর্ণ নাম
                  </label>
                  <input
                    type="text"
                    className="block w-full px-3.5 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all"
                    placeholder="যেমন: সৌভভ দাশ"
                    {...register("name", {
                      required: "আপনার নামটি দেওয়া বাধ্যতামূলক",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-[10px] font-medium mt-0.5 flex items-center gap-1">
                      ⚠️ {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email address */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-0.5">
                    ইমেইল অ্যাড্রেস
                  </label>
                  <input
                    type="email"
                    className="block w-full px-3.5 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all"
                    placeholder="example@email.com"
                    {...register("email", {
                      required: "ইমেইল অ্যাড্রেস দেওয়া বাধ্যতামূলক",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "দয়া করে একটি সঠিক ইমেইল অ্যাড্রেস লিখুন",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[10px] font-medium mt-0.5 flex items-center gap-1">
                      ⚠️ {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-0.5">
                    মোবাইল নাম্বার
                  </label>
                  <input
                    type="tel"
                    className="block w-full px-3.5 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all"
                    placeholder="01XXXXXXXXX"
                    {...register("phone", {
                      required: "মোবাইল নাম্বার দেওয়া বাধ্যতামূলক",
                      minLength: {
                        value: 11,
                        message:
                          "মোবাইল নাম্বারটি অবশ্যই অন্তত ১১ ডিজিটের হতে হবে",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-[10px] font-medium mt-0.5 flex items-center gap-1">
                      ⚠️ {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-0.5">
                    পাসওয়ার্ড
                  </label>
                  <input
                    type="password"
                    className="block w-full px-3.5 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all"
                    placeholder="••••••••"
                    {...register("password", {
                      required: "পাসওয়ার্ড দেওয়া বাধ্যতামূলক",
                      minLength: {
                        value: 6,
                        message: "পাসওয়ার্ডটি অবশ্যই ন্যূনতম ৬ অক্ষরের হতে হবে",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-[10px] font-medium mt-0.5 flex items-center gap-1">
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
                    className="block w-full px-3 py-1 text-xs text-gray-500 border border-gray-300 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    accept="image/*"
                    {...register("file", {
                      required: "প্রোফাইল ছবি আপলোড করা বাধ্যতামূলক",
                    })}
                  />
                  {errors.file && (
                    <p className="text-red-500 text-[10px] font-medium mt-0.5 flex items-center gap-1">
                      ⚠️ {errors.file.message}
                    </p>
                  )}
                </div>

                <button
                  className="w-full mt-1 font-semibold text-white py-2 rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-br from-[#244B43] to-[#446E65] hover:brightness-110 hover:shadow-lg focus:ring-[#244B43] text-xs sm:text-sm"
                  type="submit"
                  disabled={spinner}
                >
                  {spinner ? (
                    <span className="flex items-center justify-center gap-2 text-xs">
                      ওটিপি পাঠানো হচ্ছে...{" "}
                      <AiOutlineLoading className="animate-spin text-base" />
                    </span>
                  ) : (
                    "ওটিপি পাঠান এবং নিবন্ধন করুন"
                  )}
                </button>
              </form>
            </>
          ) : (
            /* ওটিপি কোড ও ভেরিফিকেশন বক্স */
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center">
                ওটিপি ভেরিফাই করুন
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500 text-center leading-relaxed">
                আপনার দেওয়া মোবাইল নাম্বারে আমরা একটি ৬ ডিজিটের ভেরিফিকেশন কোড
                পাঠিয়েছি।
              </p>

              <div>
                <input
                  type="text"
                  placeholder="৬-ডিজিটের কোড"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="block w-full px-4 py-2 text-lg font-bold text-center tracking-widest border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all"
                />
              </div>

              <button
                onClick={handleVerifyAndRegister}
                className="w-full font-semibold text-white py-2 rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-br from-[#244B43] to-[#446E65] hover:brightness-110 hover:shadow-lg focus:ring-[#244B43] text-xs sm:text-sm"
                disabled={spinner}
              >
                {spinner ? (
                  <span className="flex items-center justify-center gap-2 text-xs">
                    অ্যাকাউন্ট ভেরিফাই হচ্ছে...{" "}
                    <AiOutlineLoading className="animate-spin text-base" />
                  </span>
                ) : (
                  "ভেরিফাই এবং সম্পন্ন করুন"
                )}
              </button>

              <div className="text-center">
                <button
                  onClick={() => setConfirmationResult(null)}
                  className="text-[11px] text-gray-400 hover:text-gray-600 hover:underline transition-colors"
                >
                  &larr; নিবন্ধনের তথ্য পরিবর্তন করুন
                </button>
              </div>
            </div>
          )}

          {/* Bottom Footer Section */}
          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <span className="text-xs text-gray-500">
              ইতিমধ্যে অ্যাকাউন্ট রয়েছে?{" "}
            </span>
            <button
              onClick={() => navigate("/login")}
              className="text-xs font-bold text-[#244B43] hover:text-[#446E65] transition-colors"
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
