import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

const FAQ = () => {
  // 🎯 Dynamic Bangla Meaningful FAQ Dataset
  const faqData = [
    {
      id: 1,
      question: "প্রাইজ বন্ড কী এবং এটি কীভাবে কাজ করে?",
      answer:
        "প্রাইজ বন্ড হলো গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক নিয়ন্ত্রিত একটি সঞ্চয় মাধ্যম। প্রতিটি ১০০ টাকা মূল্যমানের বন্ড কিনে আপনি সরকারের অভ্যন্তরীণ তহবিলে বিনিয়োগ করছেন। এর কোনো মেয়াদ নেই এবং সরকার প্রতি বছর ৪ বার ড্র-এর মাধ্যমে কোটি টাকার পুরস্কার প্রদান করে।",
    },
    {
      id: 2,
      question: "আমি কি প্রাইজ বন্ড কিনে যেকোনো সময় টাকা ফেরত পেতে পারি?",
      answer:
        "হ্যাঁ, সম্পূর্ণ শতভাগ ক্যাশ-ব্যাক গ্যারান্টি রয়েছে। আপনি বন্ড কেনার পর যেকোনো দিন বাংলাদেশ ব্যাংক, যেকোনো বাণিজ্যিক ব্যাংক বা পোস্ট অফিসে বন্ড জমা দিয়ে তাৎক্ষণিকভাবে আপনার সমপরিমাণ (১০০ টাকা প্রতি বন্ড) নগদ টাকা তুলে নিতে পারবেন।",
    },
    {
      id: 3,
      question: "প্রাইজ বন্ডের ড্র বছরে কতবার এবং কখন অনুষ্ঠিত হয়?",
      answer:
        "বাংলাদেশ ব্যাংক বছরে মোট চারবার অফিশিয়াল ড্র পরিচালনা করে। ড্র-এর নির্দিষ্ট তারিখগুলো হলো: ৩১ জানুয়ারি, ৩০ এপ্রিল, ৩১ জুলাই এবং ৩১ অক্টোবর। প্রতিটি ড্র-তে প্রতিটি সিরিজের একই নাম্বার পুরস্কারের জন্য যোগ্য বলে বিবেচিত হয়।",
    },
    {
      id: 4,
      question: "পুরস্কারের টাকার ওপর কি কোনো সরকারি ট্যাক্স বা ভ্যাট কাটে?",
      answer:
        "হ্যাঁ, সরকারি নিয়ম অনুযায়ী প্রাইজ বন্ডের যেকোনো পুরস্কারের ওপর ২০% উৎস কর (Source Tax) প্রযোজ্য হয়। পুরস্কারের টাকা দাবি করার পর এই ২০% ভ্যাট স্বয়ংক্রিয়ভাবে কেটে রেখে বাকি পুরো টাকা বিজয়ীকে বুঝিয়ে দেওয়া হয়।",
    },
    {
      id: 5,
      question: "পুরস্কার জেতার পর কত দিনের মধ্যে টাকা দাবি করতে হয়?",
      answer:
        "ড্র অনুষ্ঠিত হওয়ার তারিখ থেকে পরবর্তী ২ বছর (২৪ মাস)-এর মধ্যে পুরস্কারের টাকা অফিশিয়ালি দাবি করতে হবে। ২ বছর পার হয়ে গেলে ওই ড্র-এর পুরস্কারের ওপর আপনার দাবি বাতিল হয়ে যাবে।",
    },
  ];

  // State to track which accordions are currently expanded
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 animate-fadeIn">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
          সাধারণ জিজ্ঞাসা <span className="text-[#244B43]">(FAQ)</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          প্রাইজ বন্ড ও আমাদের ট্র্যাকিং সিস্টেম সম্পর্কে কিছু সাধারণ প্রশ্নের
          উত্তর
        </p>
      </div>

      {/* Accordion Container Block */}
      <div className="space-y-3">
        {faqData.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden transition-all duration-300"
            >
              {/* Question Trigger Row */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-4 text-left transition-colors duration-300 focus:outline-none hover:bg-gray-50/50"
              >
                <span
                  className={`text-xs sm:text-sm font-bold tracking-tight pr-4 leading-snug transition-colors duration-300 ${
                    isOpen ? "text-[#244B43]" : "text-gray-700"
                  }`}
                >
                  {faq.question}
                </span>

                {/* Accordion Smooth Icon Rotation Mapping */}
                <HiChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#244B43]" : ""
                  }`}
                />
              </button>

              {/* Smooth Collapsible Answer Container Area */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-[500px] border-t border-gray-50" : "max-h-0"
                }`}
              >
                <p className="p-4 text-xs sm:text-[13px] text-gray-500 leading-relaxed bg-slate-50/40">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
