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
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import Loading from "../Components/Loading/Loading";

const RegisterPage = () => {
  const { updateUserProfile, sendOtpToPhone, loading, auth } = useAuth();
  const axios = useAxios();
  const [spinner, setSpinner] = useState(false);
  const { uploadImage } = useImageUpload();
  const navigate = useNavigate();

  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpCode, setOtpCode] = useState("");
  const [savedFormData, setSavedFormData] = useState(null);

  const recaptchaVerifierRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // মেমোরি লিক এবং ডাইনামিক নোড ক্লিনআপ করতে কম্পোনেন্ট আনমাউন্ট ইফেক্ট
  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (e) {
          console.log("Safe cleanup on unmount");
        }
        recaptchaVerifierRef.current = null;
      }
      // পেজ থেকে চলে যাওয়ার সময় ডাইনামিক ডিভ থাকলে তা মুছে ফেলা
      const dynamicNode = document.getElementById("dynamic-recaptcha-node");
      if (dynamicNode) dynamicNode.remove();
    };
  }, []);

  // ⚡ ডাইনামিক রিক্যাপচা সেটআপ (রিঅ্যাক্ট রি-রেন্ডার বাগ প্রুফ)
  const setupRecaptcha = () => {
    // ১. আগের মেমোরি রেফারেন্স ক্লিন করা
    if (recaptchaVerifierRef.current) {
      try {
        recaptchaVerifierRef.current.clear();
      } catch (e) {
        console.log("Previous verifier cleared safely");
      }
      recaptchaVerifierRef.current = null;
    }

    // ২. ডম-এ আগে থেকে কোনো পুরনো ডাইনামিক ডিভ থাকলে তা রিমুভ করা
    const oldElement = document.getElementById("dynamic-recaptcha-node");
    if (oldElement) {
      oldElement.remove();
    }

    // ৩. সরাসরি ব্রাউজারের document.body-তে নতুন হিডেন ডিভ যুক্ত করা
    const recaptchaDiv = document.createElement("div");
    recaptchaDiv.id = "dynamic-recaptcha-node";
    recaptchaDiv.className = "hidden";
    document.body.appendChild(recaptchaDiv);

    // ৪. একদম ফ্রেশ এলিমেন্ট দিয়ে রিক্যাপচা ইনিশিয়ালাইজ করা
    recaptchaVerifierRef.current = new RecaptchaVerifier(
      auth,
      "dynamic-recaptcha-node",
      {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA verified dynamically.");
        },
        "expired-callback": () => {
          toast.error("reCAPTCHA-এর মেয়াদ শেষ। দয়া করে আবার চেষ্টা করুন।");
          if (recaptchaVerifierRef.current)
            recaptchaVerifierRef.current.clear();
        },
      },
    );
  };

  // 📞 ধাপ ১: ওটিপি সেন্ড করার হ্যান্ডলার
  const onSubmit = async (data) => {
    setSpinner(true);
    try {
      const formattedPhone = data.phone.startsWith("+88")
        ? data.phone
        : `+88${data.phone}`;

      // ওটিপি ওড়ার ঠিক আগের মুহূর্তে ফ্রেশ ডম তৈরি হবে
      setupRecaptcha();
      const appVerifier = recaptchaVerifierRef.current;

      const confResult = await sendOtpToPhone(formattedPhone, appVerifier);

      setConfirmationResult(confResult);
      setSavedFormData({ ...data, formattedPhone });

      toast.success("আপনার নাম্বারে ওটিপি (OTP) কোড পাঠানো হয়েছে!");
    } catch (error) {
      console.error("OTP Send Error: ", error);
      toast.error(
        getFirebaseErrorMessage(error) || "ওটিপি পাঠাতে ব্যর্থ হয়েছে",
      );

      // এরর আসলে তৈরি হওয়া ডাইনামিক ডিভ ডম থেকে ডিলিট করে দেওয়া
      const dynamicNode = document.getElementById("dynamic-recaptcha-node");
      if (dynamicNode) dynamicNode.remove();

      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current = null;
      }
    } finally {
      setSpinner(false);
    }
  };

  // 🔑 ধাপ ২: ওটিপি ভেরিফাই ও ইমেইল অ্যাকাউন্ট লিংক করার হ্যান্ডলার
  const handleVerifyAndRegister = async () => {
    if (!otpCode || otpCode.length < 6) {
      return toast.error("দয়া করে ৬ ডিজিটের সঠিক ওটিপি কোডটি লিখুন");
    }

    setSpinner(true);
    try {
      const { name, email, password, formattedPhone } = savedFormData;

      // ১. ওটিপি কোড কনফার্ম করা
      const userCredential = await confirmationResult.confirm(otpCode);
      const firebaseUser = userCredential.user;

      // সফল হওয়ার পর ডাইনামিক ডিভ ও রিক্যাপচা মেমোরি ক্লিন করা
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (e) {
          console.log("Safe clear caught");
        }
        recaptchaVerifierRef.current = null;
      }
      const dynamicNode = document.getElementById("dynamic-recaptcha-node");
      if (dynamicNode) dynamicNode.remove();

      // ২. ইমেইল ও পাসওয়ার্ড অ্যাকাউন্ট লিংকআপ
      try {
        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(firebaseUser, credential);
      } catch (linkError) {
        if (linkError.code === "auth/email-already-in-use") {
          throw new Error(
            "এই ইমেইলটি দিয়ে অলরেডি অন্য একটি অ্যাকাউন্ট যুক্ত রয়েছে।",
          );
        }
        throw linkError;
      }

      // ৩. ছবি থাকলে ক্লাউডিনারিতে আপলোড
      let uploadedImageUrl = "";
      const file = savedFormData?.file?.[0];
      if (file) {
        try {
          const photo = await uploadImage(file);
          uploadedImageUrl = photo?.secureUrl || "";
        } catch (imgError) {
          console.error(
            "Image upload failed, continuing with empty profile pic.",
          );
        }
      }

      // ৪. ফায়ারবেস ডিসপ্লে প্রোফাইল আপডেট
      await updateUserProfile(name, uploadedImageUrl);

      // ৫. আপনার মঙ্গোডিবি ব্যাকএন্ডে ডেটা পাঠানো
      const newUser = {
        name,
        email,
        phone: formattedPhone,
        imageUrl: uploadedImageUrl,
      };

      await axios.post("/user", newUser);

      toast.success("সফলভাবে অ্যাকাউন্ট তৈরি ও ভেরিফিকেশন সম্পন্ন হয়েছে!");
      navigate("/");
    } catch (error) {
      console.error("❌ Verification/Registration Error:", error);
      toast.error(
        getFirebaseErrorMessage(error) ||
          error.message ||
          "নিবন্ধন ব্যর্থ হয়েছে",
      );
    } finally {
      setSpinner(false);
    }
  };

  // ইনিশিয়াল পেজ লোডিং ট্র্যাকার
  if (loading) return <Loading />;

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-90px)] py-2 px-1 md:px-4 overflow-hidden">
        <div className="w-full max-w-md p-5 border border-gray-100 rounded-2xl shadow-xl bg-white">
          {!confirmationResult ? (
            <>
              <h2 className="mb-2 text-xl sm:text-2xl font-extrabold text-gray-800 tracking-tight text-center">
                নতুন অ্যাকাউন্ট তৈরি করুন
              </h2>

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
                      required: "আপনার নাম দেওয়া আবশ্যক",
                    })}
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
                      required: "ইমেইল দেওয়া আবশ্যক",
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

                {/* Phone */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-0.5">
                    মোবাইল নাম্বার
                  </label>
                  <input
                    type="tel"
                    className="block w-full px-3.5 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all"
                    placeholder="01XXXXXXXXX"
                    {...register("phone", {
                      required: "মোবাইল নাম্বার দেওয়া আবশ্যক",
                      minLength: {
                        value: 11,
                        message: "কমপক্ষে ১১ ডিজিট হতে হবে",
                      },
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
                  <input
                    type="password"
                    className="block w-full px-3.5 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all"
                    placeholder="••••••••"
                    {...register("password", {
                      required: "পাসওয়ার্ড দেওয়া আবশ্যক",
                      minLength: {
                        value: 6,
                        message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
                      },
                    })}
                  />
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
                  className="w-full mt-1 font-semibold text-white py-2 rounded-xl transition-all shadow-md bg-gradient-to-br from-[#244B43] to-[#446E65] hover:brightness-110 disabled:opacity-50 text-xs sm:text-sm flex items-center justify-center gap-2"
                  type="submit"
                  disabled={spinner}
                >
                  {spinner ? (
                    <>
                      ওটিপি পাঠানো হচ্ছে...{" "}
                      <AiOutlineLoading className="animate-spin text-base" />
                    </>
                  ) : (
                    "ওটিপি পাঠান এবং নিবন্ধন করুন"
                  )}
                </button>
              </form>
            </>
          ) : (
            /* ওটিপি ইনপুট বক্স */
            <div className="space-y-3 animate-fadeIn">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center">
                ওটিপি ভেরিফাই করুন
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500 text-center leading-relaxed">
                আপনার দেওয়া মোবাইল নাম্বারে একটি ৬ ডিজিটের ভেরিফিকেশন কোড পাঠানো
                হয়েছে।
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
                className="w-full font-semibold text-white py-2 rounded-xl transition-all shadow-md bg-gradient-to-br from-[#244B43] to-[#446E65] hover:brightness-110 disabled:opacity-50 text-xs sm:text-sm flex items-center justify-center gap-2"
                disabled={spinner}
              >
                {spinner ? (
                  <>
                    অ্যাকাউন্ট ভেরিফাই হচ্ছে...{" "}
                    <AiOutlineLoading className="animate-spin text-base" />
                  </>
                ) : (
                  "ভেরিফাই এবং সম্পন্ন করুন"
                )}
              </button>

              <div className="text-center">
                <button
                  onClick={() => setConfirmationResult(null)}
                  className="text-[11px] text-gray-400 hover:text-gray-600 hover:underline"
                >
                  &larr; নিবন্ধনের তথ্য পরিবর্তন করুন
                </button>
              </div>
            </div>
          )}

          {/* লগইন লিংক */}
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
