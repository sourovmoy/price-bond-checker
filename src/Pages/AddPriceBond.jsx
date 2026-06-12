import React, { useState } from "react";
import Container from "../Components/Shared/Container/Container";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading/Loading";
import toast from "react-hot-toast";

const AddPriceBond = () => {
  const axios = useAxiosSecure();
  const { loading } = useAuth();
  const [spinner, setSpinner] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange", // টাইপ করার সাথে সাথে ভ্যালিডেশন চেক হবে
  });

  const onSubmit = async (data) => {
    setSpinner(true);
    try {
      const priceBondInfo = {
        ...data,
      };
      const res = await axios.post("/add-price-bond", priceBondInfo);

      if (
        res?.data?.result?.insertedId ||
        res?.data?.result?.modifiedCount > 0 ||
        res?.data?.result?.upsertedCount > 0
      ) {
        toast.success("সফলভাবে আপনার ড্যাশবোর্ডে যুক্ত হয়েছে!");
        reset();
      } else {
        toast.error("যুক্ত করা যায়নি / বন্ডটি অলরেডি আপনার তালিকায় আছে");
      }
    } catch (error) {
      console.log("error from add pricebond", error.message);
      toast.error(
        error.response?.data?.message || "বন্ড যুক্ত করতে ব্যর্থ হয়েছেন",
      );
    } finally {
      setSpinner(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="max-w-5xl mx-auto py-10 px-4 animate-fadeIn">
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* LEFT COLUMN: Input Form Box */}
          <div className="md:col-span-5 bg-white border border-gray-100 rounded-2xl shadow-xl p-5 sm:p-7 transition-all hover:shadow-2xl">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="p-1.5 bg-green-50 text-[#244B43] rounded-md text-sm">
                🎫
              </span>
              বন্ডের বিবরণ (Details)
            </h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  প্রাইজ বন্ড নাম্বার
                </label>
                <input
                  type="text"
                  className={`block w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.PriceBond
                      ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-100 focus:border-[#244B43]"
                  }`}
                  placeholder="যেমন: খট0768440"
                  {...register("PriceBond", {
                    required: "প্রাইজ বন্ড নাম্বার দেওয়া বাধ্যতামূলক।",
                    validate: {
                      noSpaces: (value) => {
                        if (/\s/.test(value)) {
                          return "বন্ড নাম্বারের মাঝে কোনো স্পেস (ফাঁকা জায়গা) দেওয়া যাবে না।";
                        }
                        return true;
                      },
                      firstTwoLetters: (value) => {
                        const prefix = value.substring(0, 2);
                        if (!/^[ক-নপ-রলশ-হড়ঢ়য়ৎংঃঁ]{2}$/.test(prefix)) {
                          return "প্রথম ২টি অক্ষর অবশ্যই সঠিক বাংলা ব্যঞ্জনবর্ণ (যেমন: খট) হতে হবে।";
                        }
                        return true;
                      },
                      nextSevenDigits: (value) => {
                        const suffix = value.substring(2);
                        if (!/^[0-9০-৯]{7}$/.test(suffix)) {
                          return "শেষের অংশে ঠিক ৭টি সংখ্যার ডিজিট (যেমন: 0768440) থাকতে হবে।";
                        }
                        return true;
                      },
                      exactLength: (value) => {
                        if (value.length !== 9) {
                          return "সিরিজ ও নাম্বার মিলিয়ে বন্ডটি ঠিক ৯ অক্ষরের হতে হবে।";
                        }
                        return true;
                      },
                    },
                  })}
                />

                {/* Validation Error Message Alert */}
                {errors.PriceBond && (
                  <div className="mt-2.5 p-2.5 bg-red-50 border-l-4 border-red-500 rounded-r-md flex items-start gap-2 animate-pulse">
                    <span className="text-red-500 text-xs mt-0.5">⚠️</span>
                    <p className="text-red-700 text-xs font-medium leading-relaxed">
                      {errors.PriceBond.message}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`w-full mt-2 font-semibold text-white py-2.5 rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  spinner
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-br from-[#244B43] to-[#446E65] hover:brightness-110 hover:shadow-lg focus:ring-[#244B43]"
                }`}
                disabled={spinner}
              >
                {spinner ? (
                  <span className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    বন্ড সেভ হচ্ছে...
                  </span>
                ) : (
                  "প্রাইজ বন্ড সংরক্ষণ করুন"
                )}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: Interactive Rules & Verification Card */}
          <div className="md:col-span-7 bg-gradient-to-br from-slate-50 to-gray-100/70 border border-gray-200/60 rounded-2xl p-5 sm:p-7">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="p-1.5 bg-amber-50 text-amber-600 rounded-md text-sm">
                📋
              </span>
              অফিশিয়াল ফরম্যাটিং ও নির্দেশিকা
            </h3>

            <div className="space-y-3.5">
              {/* Rule 1 */}
              <div className="flex gap-3 bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-[#244B43] font-bold text-xs flex items-center justify-center mt-0.5">
                  ১
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800">
                    শুধুমাত্র বাংলা ব্যঞ্জনবর্ণ সমর্থিত
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-relaxed">
                    বন্ডের শুরুর অংশটি অবশ্যই ঠিক ২টি বাংলা ব্যঞ্জনবর্ণ দিয়ে
                    শুরু হতে হবে, যেমন:
                    <span className="font-bold text-[#244B43] bg-green-50 px-1 py-0.5 mx-1 rounded">
                      খট
                    </span>
                    ,
                    <span className="font-bold text-[#244B43] bg-green-50 px-1 py-0.5 mx-1 rounded">
                      খঙ
                    </span>{" "}
                    অথবা
                    <span className="font-bold text-[#244B43] bg-green-50 px-1 py-0.5 mx-1 rounded">
                      গপ
                    </span>
                    ।
                  </p>
                  <span className="inline-block mt-1 text-[9px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-semibold">
                    গ্রহণযোগ্য নয়: স্বরবর্ণ (অ, আ) অথবা কার-চিহ্ন (া, ি, ু)
                  </span>
                </div>
              </div>

              {/* Rule 2 */}
              <div className="flex gap-3 bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-[#244B43] font-bold text-xs flex items-center justify-center mt-0.5">
                  ২
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800">
                    ৭-ডিজিটের সংখ্যা বা সিরিয়াল
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-relaxed">
                    অক্ষর দুটির ঠিক পরপরই কোনো ফাঁকা জায়গা ছাড়া ৭টি সংখ্যার
                    ডিজিট থাকতে হবে (যেমন:{" "}
                    <span className="font-mono bg-gray-100 px-1 rounded font-semibold">
                      0768440
                    </span>
                    )। আমাদের সিস্টেম বাংলা ও ইংরেজি উভয় ডিজিটই সাপোর্ট করে।
                  </p>
                </div>
              </div>

              {/* Rule 3 */}
              <div className="flex gap-3 bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center mt-0.5">
                  !
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800">
                    কোনো প্রকার স্পেস দেওয়া যাবে না
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-relaxed">
                    বন্ডের শুরুতে, মাঝে কিংবা শেষে কোনো স্পেস রাখবেন না। টাইপিং
                    ভুলের কারণে যেমন{" "}
                    <span className="text-red-500 line-through font-mono">
                      "খট ০৭৬৮৪৪০"
                    </span>{" "}
                    লিখলে ফর্মে তাৎক্ষণিক ওয়ার্নিং দেখাবে।
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Visual Example Blueprint Block */}
            <div className="mt-5 bg-white border border-dashed border-gray-300 rounded-xl p-3.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-2">
                সঠিক বন্ড নাম্বারের গঠন কাঠামো:
              </span>
              <div className="flex items-center gap-1 font-mono text-sm sm:text-base font-bold text-center">
                <span className="bg-green-50 text-[#244B43] px-2.5 py-1 rounded-md border border-green-100">
                  খ
                </span>
                <span className="bg-green-50 text-[#244B43] px-2.5 py-1 rounded-md border border-green-100">
                  ট
                </span>
                <span className="bg-blue-50/70 text-blue-700 px-2 py-1 rounded-md border border-blue-100 tracking-widest flex-1">
                  0768440
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 px-0.5 font-medium">
                <span>[২টি বাংলা অক্ষর]</span>
                <span>[ঠিক ৭টি সংখ্যার ডিজিট]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddPriceBond;
