import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MAX_RANGE_DIFF = 50;

const PREFIX_REGEX = /^[ক-নপ-রলশ-হড়ঢ়য়ৎংঃঁ]{2}$/;

const normalize = (value) =>
  value
    .replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d))
    .replace(/[–—−]/g, "-");

const parseBondInput = (raw) => {
  const value = normalize(raw.trim());

  if (!value) {
    return { ok: false, message: "প্রাইজ বন্ড নাম্বার দেওয়া বাধ্যতামূলক।" };
  }
  if (/\s/.test(value)) {
    return {
      ok: false,
      message: "বন্ড নাম্বারের মাঝে কোনো স্পেস (ফাঁকা জায়গা) দেওয়া যাবে না।",
    };
  }

  const prefix = value.substring(0, 2);
  if (!PREFIX_REGEX.test(prefix)) {
    return {
      ok: false,
      message:
        "প্রথম ২টি অক্ষর অবশ্যই সঠিক বাংলা ব্যঞ্জনবর্ণ (যেমন: খট) হতে হবে।",
    };
  }

  const rest = value.substring(2);
  const parts = rest.split("-");

  if (parts.length > 2) {
    return {
      ok: false,
      message:
        "ড্যাশ (-) চিহ্ন মাত্র একবার ব্যবহার করা যাবে (যেমন: খট0768440-60)।",
    };
  }

  const serial = parts[0];
  if (!/^[0-9]{7}$/.test(serial)) {
    return {
      ok: false,
      message: "অক্ষরের পর ঠিক ৭টি সংখ্যার ডিজিট (যেমন: 0768440) থাকতে হবে।",
    };
  }

  // একটি বন্ড
  if (parts.length === 1) {
    return { ok: true, bonds: [`${prefix}${serial}`] };
  }

  // ধারাবাহিক বন্ড (রেঞ্জ)
  const endPart = parts[1];
  if (!/^[0-9]{2}$/.test(endPart)) {
    return {
      ok: false,
      message:
        "ড্যাশের পরে শেষ নাম্বারের ঠিক ২টি ডিজিট দিন (যেমন: খট0768440-60)।",
    };
  }

  const startLast2 = Number(serial.slice(-2));
  const endLast2 = Number(endPart);

  if (endLast2 <= startLast2) {
    return {
      ok: false,
      message: `শেষ নাম্বার (${endPart}) অবশ্যই শুরুর নাম্বারের শেষ ২ ডিজিট (${serial.slice(
        -2,
      )}) থেকে বড় হতে হবে।`,
    };
  }

  if (endLast2 - startLast2 > MAX_RANGE_DIFF) {
    return {
      ok: false,
      message: `একসাথে সর্বোচ্চ ${MAX_RANGE_DIFF} ব্যবধান পর্যন্ত যোগ করা যাবে (যেমন: 400 থেকে 450)।`,
    };
  }

  const base = serial.slice(0, 5); // প্রথম ৫ ডিজিট অপরিবর্তিত থাকে
  const bonds = [];
  for (let n = startLast2; n <= endLast2; n++) {
    bonds.push(`${prefix}${base}${String(n).padStart(2, "0")}`);
  }
  return { ok: true, bonds };
};

const MultipleBonds = () => {
  const axios = useAxiosSecure();
  const [spinner, setSpinner] = useState(false);
  const [bondList, setBondList] = useState([]);
  const [notice, setNotice] = useState("");
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  // লাইভ প্রিভিউয়ের জন্য
  const currentInput = watch("PriceBond") || "";
  const preview = currentInput ? parseBondInput(currentInput) : null;

  const onSubmit = async (data) => {
    const result = parseBondInput(data.PriceBond);
    if (!result.ok) return;

    setSpinner(true);
    setNotice("");
    try {
      console.log(result.bonds);

      const res = await axios.post("add-multiple-price-bonds", {
        bonds: result.bonds,
      });
      toast.success(res?.data?.message, { duration: 4000 });

      queryClient.invalidateQueries({ queryKey: ["bonds"] });

      const existing = new Set(bondList);
      const fresh = result.bonds.filter((b) => !existing.has(b));
      const skipped = result.bonds.length - fresh.length;

      setBondList((prev) => [...prev, ...fresh]);
      setNotice(
        skipped > 0
          ? `${fresh.length}টি নতুন বন্ড যোগ হয়েছে। ${skipped}টি আগে থেকেই তালিকায় থাকায় বাদ দেওয়া হয়েছে।`
          : `${fresh.length}টি বন্ড সফলভাবে যোগ হয়েছে।`,
      );
      reset();
    } finally {
      setSpinner(false);
    }
  };

  const removeBond = (bond) =>
    setBondList((prev) => prev.filter((b) => b !== bond));

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start mb-15">
      {/* LEFT COLUMN: Input Form Box */}
      <div className="md:col-span-5 bg-white border border-gray-100 rounded-2xl shadow-xl p-5 sm:p-7 transition-all hover:shadow-2xl">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="p-1.5 bg-green-50 text-[#244B43] rounded-md text-sm">
            🎫
          </span>
          বন্ডের বিবরণ (Details)
        </h3>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              ধারাবাহিকভাবে প্রাইজবন্ড যোগ করুন
            </label>
            <input
              type="text"
              className={`block w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.PriceBond
                  ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                  : "border-gray-300 focus:ring-green-100 focus:border-[#244B43]"
              }`}
              placeholder="যেমন: খট0768440-60"
              {...register("PriceBond", {
                validate: (value) => {
                  const result = parseBondInput(value || "");
                  return result.ok ? true : result.message;
                },
              })}
            />
            <p className="mt-1.5 text-[11px] text-gray-500">
              একটি বন্ডের জন্য{" "}
              <span className="font-mono font-semibold">খট0768440</span>, আর
              ধারাবাহিক বন্ডের জন্য{" "}
              <span className="font-mono font-semibold">খট0768440-60</span>{" "}
              লিখুন।
            </p>

            {/* Live preview */}
            {preview?.ok && !errors.PriceBond && (
              <div className="mt-2.5 p-2.5 bg-green-50 border-l-4 border-[#244B43] rounded-r-md text-xs text-[#244B43] font-medium">
                {preview.bonds.length === 1
                  ? `১টি বন্ড যোগ হবে: ${preview.bonds[0]}`
                  : `${preview.bonds.length}টি বন্ড যোগ হবে: ${preview.bonds[0]} থেকে ${
                      preview.bonds[preview.bonds.length - 1]
                    } পর্যন্ত`}
              </div>
            )}

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
                : "bg-linear-to-br from-[#244B43] to-[#446E65] hover:brightness-110 hover:shadow-lg focus:ring-[#244B43]"
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

        {notice && (
          <p className="mt-3 text-xs font-medium text-[#244B43]">{notice}</p>
        )}
      </div>

      {/* RIGHT COLUMN: Interactive Rules & Verification Card */}
      <div className="md:col-span-7 bg-linear-to-br from-slate-50 to-gray-100/70 border border-gray-200/60 rounded-2xl p-5 sm:p-7">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="p-1.5 bg-amber-50 text-amber-600 rounded-md text-sm">
            📋
          </span>
          অফিশিয়াল ফরম্যাটিং ও নির্দেশিকা
        </h3>

        <div className="space-y-3.5">
          {/* Rule 1 */}
          <div className="flex gap-3 bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
            <div className="shrink-0 w-5 h-5 rounded-full bg-green-100 text-[#244B43] font-bold text-xs flex items-center justify-center mt-0.5">
              ১
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-800">
                শুধুমাত্র বাংলা ব্যঞ্জনবর্ণ সমর্থিত
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-relaxed">
                বন্ডের শুরুর অংশটি অবশ্যই ঠিক ২টি বাংলা ব্যঞ্জনবর্ণ দিয়ে শুরু
                হতে হবে, যেমন:
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
                গ্রহণযোগ্য নয়: স্বরবর্ণ (অ, আ) অথবা কার-চিহ্ন (া, ি, ু)
              </span>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="flex gap-3 bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
            <div className="shrink-0 w-5 h-5 rounded-full bg-green-100 text-[#244B43] font-bold text-xs flex items-center justify-center mt-0.5">
              ২
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-800">
                ৭-ডিজিটের সংখ্যা বা সিরিয়াল
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-relaxed">
                অক্ষর দুটির ঠিক পরপরই কোনো ফাঁকা জায়গা ছাড়া ৭টি সংখ্যার ডিজিট
                থাকতে হবে (যেমন:{" "}
                <span className="font-mono bg-gray-100 px-1 rounded font-semibold">
                  0768440
                </span>
                )। আমাদের সিস্টেম বাংলা ও ইংরেজি উভয় ডিজিটই সাপোর্ট করে।
              </p>
            </div>
          </div>

          {/* Rule 3 - Range */}
          <div className="flex gap-3 bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
            <div className="shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center mt-0.5">
              ৩
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-800">
                ধারাবাহিক বন্ড একসাথে যোগ করুন
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-relaxed">
                একের পর এক সিরিয়ালের বন্ড থাকলে ড্যাশ (-) দিয়ে শেষ নাম্বারের
                ২টি ডিজিট লিখুন। যেমন{" "}
                <span className="font-mono bg-gray-100 px-1 rounded font-semibold">
                  খট0768440-60
                </span>{" "}
                লিখলে{" "}
                <span className="font-mono bg-gray-100 px-1 rounded font-semibold">
                  0768440
                </span>{" "}
                থেকে{" "}
                <span className="font-mono bg-gray-100 px-1 rounded font-semibold">
                  0768460
                </span>{" "}
                পর্যন্ত সবগুলো বন্ড যোগ হবে।
              </p>
              <ul className="mt-1.5 space-y-0.5 text-[11px] sm:text-xs text-gray-500 list-disc pl-4">
                <li>শেষ নাম্বার অবশ্যই শুরুর নাম্বারের চেয়ে বড় হতে হবে।</li>
                <li>
                  শুরু ও শেষ নাম্বারের ব্যবধান সর্বোচ্চ {MAX_RANGE_DIFF} হতে
                  পারবে।
                </li>
                <li>
                  শুরুর নাম্বারের প্রথম ৫ ডিজিট ও অক্ষর সব বন্ডে একই থাকবে, শুধু
                  শেষ ২ ডিজিট বদলাবে।
                </li>
                <li>একই বন্ড দুইবার যোগ হলে তা স্বয়ংক্রিয়ভাবে বাদ যাবে।</li>
              </ul>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="flex gap-3 bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
            <div className="shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center mt-0.5">
              !
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-800">
                কোনো প্রকার স্পেস দেওয়া যাবে না
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-relaxed">
                বন্ডের শুরুতে, মাঝে কিংবা শেষে কোনো স্পেস রাখবেন না। টাইপিং
                ভুলের কারণে যেমন{" "}
                <span className="text-red-500 line-through font-mono">
                  "খট ০৭৬৮৪৪০"
                </span>{" "}
                বা{" "}
                <span className="text-red-500 line-through font-mono">
                  "খট0768440 - 60"
                </span>{" "}
                লিখলে ফর্মে তাৎক্ষণিক ওয়ার্নিং দেখাবে।
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
            <span className="text-gray-400">-</span>
            <span className="bg-amber-50 text-amber-700 px-2 py-1 rounded-md border border-amber-100">
              60
            </span>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 px-0.5 font-medium">
            <span>[২টি বাংলা অক্ষর]</span>
            <span>[ঠিক ৭টি সংখ্যার ডিজিট]</span>
            <span>[শেষ ২ ডিজিট (ঐচ্ছিক)]</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleBonds;
