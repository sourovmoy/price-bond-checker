import React from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
} from "react-icons/fa";
import Container from "../Components/Shared/Container/Container";

const About = () => {
  return (
    <Container>
      <div className="w-full py-10 px-4 animate-fadeIn">
        {/* হেডার সেকশন */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
            আমাদের সম্পর্কে
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-xl mx-auto leading-relaxed">
            প্রাইস বন্ড চেকার প্ল্যাটফর্মের পেছনে থাকা মূল স্বপ্নদর্শী এবং
            ডেভেলপারের সাথে পরিচিত হোন।
          </p>
        </div>

        {/* মেইন কন্টেন্ট গ্রিড */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* বাম পাশের প্রোফাইল কার্ড (৪ কলাম) */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 p-1 mx-auto mb-4 shadow-inner">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-gray-400">
                <img
                  src="/src/assets/sourov-dash .png"
                  alt="Sourov Dash image"
                  className="rounded-full h-20 w-20"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900">Sourov Dash</h2>
            <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider mt-1">
              Full-Stack Web Developer
            </p>

            <div className="border-t border-dashed border-slate-100 my-5"></div>

            {/* কন্টাক্ট ইনফো */}
            <div className="space-y-3 text-left text-xs text-gray-600">
              <a
                href="mailto:sourovmmoysanju@gmail.com"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50/50 hover:text-cyan-600 transition-all group"
              >
                <FaEnvelope className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 shrink-0" />
                <span className="truncate">sourovmmoysanju@gmail.com</span>
              </a>

              <a
                href="tel:01742818496"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 hover:text-emerald-600 transition-all group"
              >
                <FaPhoneAlt className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 shrink-0" />
                <span>01742818496</span>
              </a>
            </div>
          </div>

          {/* ডান পাশের ডিটেইলস সেকশন (৮ কলাম) */}
          <div className="lg:col-span-8 space-y-6">
            {/* আমাদের লক্ষ্য (Vision) */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-cyan-500">
                  <FaBriefcase />
                </span>
                আমাদের লক্ষ্য ও উদ্দেশ্য
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                বাংলাদেশী প্রাইস বন্ড হোল্ডারদের ড্র-এর ফলাফল মেলানোর জটিল
                প্রক্রিয়াকে সহজ ও ডিজিটাল করাই আমাদের মূল লক্ষ্য। কাগজের পাতায়
                বা বড় পিডিএফ ফাইলের মাঝে প্রতি বছর ৪ বার শত শত বন্ডের নাম্বার
                ম্যানুয়ালি খোঁজা অত্যন্ত কষ্টসাধ্য। আমাদের এই প্ল্যাটফর্মের
                মাধ্যমে ব্যবহারকারীরা মাত্র এক ক্লিকেই তাদের বন্ডের ফলাফল
                স্বয়ংক্রিয়ভাবে লাইভ ডাটাবেজ থেকে চেক করে নিতে পারবেন।
              </p>
            </div>

            {/* স্কিল ও এক্সপার্টাইজ */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">
                  <FaCode />
                </span>
                ব্যবহৃত প্রযুক্তি সমূহ
              </h3>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
                <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60">
                  React.js
                </span>
                <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60">
                  Next.js
                </span>
                <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60">
                  Tailwind CSS
                </span>
                <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60">
                  Node.js
                </span>
                <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60">
                  Express.js
                </span>
                <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60">
                  MongoDB
                </span>
                <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60">
                  Firebase Auth
                </span>
              </div>
            </div>

            {/* কাজের মূল ভিত্তি (Core Values) */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-amber-500">
                  <FaGraduationCap />
                </span>
                কেন আমাদের ওপর ভরসা করবেন?
              </h3>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></span>
                  <span>
                    <strong>১০০% নির্ভুল ফলাফল:</strong> আমরা সরাসরি অফিশিয়াল
                    সোর্স থেকে ড্র-এর ডেটা প্রসেস করি।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                  <span>
                    <strong>নিরাপদ ডেটাবেজ:</strong> আপনার ব্যক্তিগত বন্ডের
                    নম্বরগুলো সুরক্ষিতভাবে সংরক্ষণ করা হয়।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                  <span>
                    <strong>ইউজার-ফ্রেন্ডলি UI:</strong> একদম সহজ এবং গোছানো
                    ইন্টারফেস, যা যেকোনো বয়সের ইউজার স্বাচ্ছন্দ্যে ব্যবহার করতে
                    পারবেন।
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
