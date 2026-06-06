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

const RegisterPage = () => {
  const { updateUserProfile, sendOtpToPhone } = useAuth();
  const axios = useAxios();
  const [spinner, setSpinner] = useState(false);
  const { uploadImage } = useImageUpload();
  const navigate = useNavigate();

  // ওটিপি ও ফর্ম ডাটা ট্র্যাক করার স্টেটসমূহ
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpCode, setOtpCode] = useState("");
  const [savedFormData, setSavedFormData] = useState(null);

  // 🟢 BEST PRACTICE: window অবজেক্টের বদলে useRef দিয়ে রিক্যাপচা ট্র্যাক করা
  const recaptchaVerifierRef = useRef(null);
  const recaptchaElementRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🟢 BEST PRACTICE: মেমোরি লিক রোধে কম্পোনেন্ট আনমাউন্ট হলে রিক্যাপচা ক্লিয়ার করা
  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  // 🔴 reCAPTCHA সেটিংস জেনারেটর
  const setupRecaptcha = () => {
    const authInstance = getAuth();

    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear();
      recaptchaVerifierRef.current = null;
    }

    // useRef-এর কারেন্ট এলিমেন্টকে ফায়ারবেসে পাস করা হলো
    recaptchaVerifierRef.current = new RecaptchaVerifier(
      authInstance,
      recaptchaElementRef.current,
      {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA verified efficiently.");
        },
        "expired-callback": () => {
          toast.error("reCAPTCHA expired. Please try again.");
          if (recaptchaVerifierRef.current)
            recaptchaVerifierRef.current.clear();
        },
      },
    );
  };

  // ==========================================
  // ১ম этап: ফর্ম ডাটা ভ্যালিডেশন এবং ওটিপি পাঠানো
  // ==========================================
  const onSubmit = async (data) => {
    setSpinner(true);
    try {
      // ডম ক্লিয়ারিং রিঅ্যাক্ট উপায়ে (useRef এর মাধ্যমে)
      if (recaptchaElementRef.current) {
        recaptchaElementRef.current.innerHTML = "";
      }

      const formattedPhone = data.phone.startsWith("+88")
        ? data.phone
        : `+88${data.phone}`;

      setupRecaptcha();
      const appVerifier = recaptchaVerifierRef.current;

      // ওটিপি রিকোয়েস্ট পাঠানো
      const confResult = await sendOtpToPhone(formattedPhone, appVerifier);

      setConfirmationResult(confResult);
      setSavedFormData({ ...data, formattedPhone });

      toast.success("OTP verification code sent to your phone!");
    } catch (error) {
      console.error("❌ OTP Sending Error:", error);
      toast.error(getFirebaseErrorMessage(error) || "Failed to send OTP");
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    } finally {
      setSpinner(false);
    }
  };

  // ==========================================
  // ২য় этап: ওটিপি ভেরিফিকেশন এবং অ্যাকাউন্ট লিঙ্কিং
  // ==========================================
  const handleVerifyAndRegister = async () => {
    if (!otpCode || otpCode.length < 6) {
      return toast.error("Please enter a valid 6-digit OTP code");
    }

    setSpinner(true);
    try {
      const { name, email, password, formattedPhone } = savedFormData;

      // ১. ওটিপি কনফার্মেশন
      const userCredential = await confirmationResult.confirm(otpCode);
      const firebaseUser = userCredential.user;

      // 🟢 BEST PRACTICE: ডম স্টেট ডিলিট হওয়ার ঠিক আগেই সেফলি রিক্যাপচা অবজেক্ট ডেস্ট্রয় করা
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
          recaptchaVerifierRef.current = null;
        } catch (e) {
          console.log("Safe cleanup caught");
        }
      }

      // ২. ইমেইল ও পাসওয়ার্ড সফল লিঙ্কিং
      try {
        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(firebaseUser, credential);
      } catch (linkError) {
        if (linkError.code === "auth/email-already-in-use") {
          throw new Error("This email is already linked to another account.");
        }
      }

      // ৩. ছবি ক্লাউডিনারিতে আপলোড করা
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

      // ৪. প্রোফাইল ও ডাটাবেজ আপডেট
      await updateUserProfile(name, uploadedImageUrl);

      const newUser = {
        name,
        email,
        phone: formattedPhone,
        imageUrl: uploadedImageUrl,
      };

      await axios.post("/user", newUser);

      toast.success("Account Successfully Created & Verified!");
      navigate("/");
    } catch (error) {
      console.error("❌ Verification/Registration Error:", error);
      toast.error(
        getFirebaseErrorMessage(error) ||
          error.message ||
          "Registration Failed",
      );
    } finally {
      setSpinner(false);
    }
  };

  return (
    <Container>
      {/* 🟢 BEST PRACTICE: রিক্যাপচাকে কন্ডিশনাল রেন্ডারিং এর বাইরে সম্পূর্ণ স্বাধীন রাখা হয়েছে */}
      <div id="recaptcha-container" className="hidden">
        <div ref={recaptchaElementRef}></div>
      </div>

      <div className="flex flex-col items-center justify-center py-1">
        <div className="w-full max-w-md p-5 border border-gray-100 rounded-lg shadow-md bg-white">
          {!confirmationResult ? (
            <>
              <h2 className="mb-3 text-3xl font-semibold text-gray-900">
                Create a new account
              </h2>

              <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder="John Doe"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      ⚠️ {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder="email@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      ⚠️ {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder="017XXXXXXXX"
                    {...register("phone", {
                      required: "Phone Number is required",
                      minLength: {
                        value: 11,
                        message: "Phone number must be at least 11 digits",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      ⚠️ {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      ⚠️ {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Profile Photo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    className="block w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-green-500"
                    accept="image/*"
                    {...register("file", { required: "Photo is required" })}
                  />
                  {errors.file && (
                    <p className="text-red-500 text-xs mt-1">
                      ⚠️ {errors.file.message}
                    </p>
                  )}
                </div>

                <button
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition duration-200 mt-4"
                  type="submit"
                  disabled={spinner}
                >
                  {spinner ? (
                    <span className="flex items-center justify-center gap-2">
                      Sending OTP <AiOutlineLoading className="animate-spin" />
                    </span>
                  ) : (
                    "Send OTP & Register"
                  )}
                </button>
              </form>
            </>
          ) : (
            /* ওটিপি কোড ও ভেরিফিকেশন বক্স */
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Verify OTP
              </h2>
              <p className="text-sm text-gray-600">
                We've sent a 6-digit confirmation code to your phone.
              </p>

              <div>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="block w-full px-3 py-2 text-xl font-bold text-center tracking-widest border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <button
                onClick={handleVerifyAndRegister}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition duration-200"
                disabled={spinner}
              >
                {spinner ? (
                  <span className="flex items-center justify-center gap-2">
                    Verifying Account{" "}
                    <AiOutlineLoading className="animate-spin" />
                  </span>
                ) : (
                  "Verify & Complete"
                )}
              </button>

              <div className="text-center">
                <button
                  onClick={() => setConfirmationResult(null)}
                  className="text-xs text-gray-500 hover:underline"
                >
                  &larr; Edit Registration Details
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
            </span>
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium text-green-600 hover:text-green-500"
            >
              Sign In now
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;
