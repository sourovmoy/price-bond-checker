import React from "react";
import { useParams } from "react-router";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Container from "../Components/Shared/Container/Container";
import Loading from "../Components/Loading/Loading";

const TIER_STYLES = {
  1: {
    head: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-900",
    amount: "text-amber-800",
    count: "text-amber-700",
    num: "bg-amber-50 border-amber-300 text-amber-800",
  },
  2: {
    head: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-900",
    amount: "text-blue-800",
    count: "text-blue-700",
    num: "bg-blue-50 border-blue-300 text-blue-800",
  },
  3: {
    head: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-900",
    amount: "text-purple-800",
    count: "text-purple-700",
    num: "bg-purple-50 border-purple-300 text-purple-800",
  },
  4: {
    head: "bg-emerald-50 border-emerald-200",
    badge: "bg-emerald-100 text-emerald-900",
    amount: "text-emerald-800",
    count: "text-emerald-700",
    num: "bg-emerald-50 border-emerald-300 text-emerald-800",
  },
  5: {
    head: "bg-gray-50 border-gray-200",
    badge: "bg-gray-100 text-gray-700",
    amount: "text-gray-600",
    count: "text-gray-500",
    num: "bg-gray-50 border-gray-200 text-gray-700",
  },
};

const NOTICE_TEXT = [
  `সাধারণ পদ্ধতিতে (অর্থাৎ প্রত্যেক সিরিজের জন্য একই নম্বর) এই 'ড্র' পরিচালিত হয় এবং বর্তমানে প্রচলনযোগ্য ১০০/- (একশত) টাকা মূল্যমানের ৮৪ (চুরাশি)টি সিরিজ যথা- কক, কখ, কগ, কঘ, কঙ, কচ, কছ, কজ, কঝ, কঞ, কট, কঠ, কড, কঢ, কণ, কত, কথ, কদ, কধ, কন, কপ, কফ, কব, কভ, কম, কয, খক, খখ, খগ, খঘ, খঙ, খচ, খছ, খজ, খঝ, খঞ, খট, খঠ, খড, খঢ, খণ, খত, খথ, খদ, খধ, খন, খফ, খব, খভ, খম, খয, গক, গখ, গগ, গঘ, গঙ, গচ, গছ, গজ, গঝ, গঞ, গট, গঠ, গড, গঢ, গণ, গত, গথ, গদ, গন, গফ, গব, গঘ, গচ, গম, গয, ঘক, ঘখ, ঘগ, ঘঘ, ঘঙ এবং ঘচ এই 'ড্র'-এর আওতাভুক্ত।`,
  `উপর্যুক্ত সিরিজ-সমূহের অন্তর্ভুক্ত ৪৬ (ছেচল্লিশ)টি সাধারণ সংখ্যা পুরস্কারের যোগ্য বলে ঘোষিত হয় এবং নিম্নবর্ণিত সংখ্যার প্রাইজবন্ডগুলো সাধারণভাবে প্রত্যেক সিরিজের ক্ষেত্রে পুরস্কারের যোগ্য বলে বিবেচিত হয়।`,
  `উদাহরণস্বরূপ: প্রাইজবন্ডের যে সংখ্যা প্রথম পুরস্কারের জন্য ঘোষিত হয়েছে, সেই সংখ্যার প্রাইজবন্ড উল্লিখিত প্রতিটি সিরিজের প্রথম পুরস্কারের যোগ্য বলিয়া বিবেচিত হবে। অনুরূপভাবে ২য়, ৩য়, ৪র্থ ও ৫ম পুরস্কারের জন্য ঘোষিত সংখ্যাও তাদের মান অনুযায়ী প্রতিটি সিরিজের ক্ষেত্রে পুরস্কার পাওয়ার যোগ্য।`,
  `উল্লেখ্য, 'ড্র'-এর নির্ধারিত তারিখ হতে ৬০ (ষাট) দিন পূর্বে (বিক্রয়ের তারিখ ধরে এবং 'ড্র'-এর তারিখ বাদ দিয়া) যে সমস্ত প্রাইজবন্ড বিক্রি হয়েছে, সেগুলি এই 'ড্র'-এর আওতায় আসবে।`,
];

const SingleDraw = () => {
  const { id } = useParams();
  const axios = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["single-draw", id],
    queryFn: async () => {
      const res = await axios.get(`/price-bonds-all-result/${id}`);
      return res?.data;
    },
    refetchOnWindowFocus: false,
  });

  const draw = data?.result;
  const prizes = draw?.prizes || [];

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formatAmount = (amount) => "৳ " + amount.toLocaleString("bn-BD");

  if (isLoading) return <Loading />;

  if (!draw)
    return (
      <div className="text-center py-20 text-gray-400">ফলাফল পাওয়া যায়নি</div>
    );

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8 px-2 md:px-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 mb-4 shadow-sm">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">
                বাংলাদেশ ব্যাংক — জাতীয় সঞ্চয় অধিদপ্তর
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                ১০০ টাকা মূল্যমানের প্রাইজ বন্ড ড্র ফলাফল
              </h2>
            </div>
            <span className="text-sm font-semibold bg-[#E1F5EE] text-[#085041] px-4 py-1.5 rounded-xl">
              ড্র নং {draw.drawNumber}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "ড্র তারিখ", value: formatDate(draw.uploadedAt) },
              { label: "মোট বিজয়ী", value: `${draw.totalWinners} জন` },
              { label: "পুরস্কার বিভাগ", value: `${prizes.length}টি` },
              { label: "উৎসে কর", value: "২০%" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <details className="bg-white border border-gray-100 rounded-2xl shadow-sm mb-4 group">
          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">
                ড্র সংক্রান্ত বিজ্ঞপ্তি
              </span>
              <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-lg">
                অফিশিয়াল
              </span>
            </div>
            <svg
              className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <div className="px-5 pb-5 border-t border-gray-50">
            {NOTICE_TEXT.map((para, i) => (
              <p key={i} className="text-sm text-gray-600 leading-relaxed mt-4">
                {para}
              </p>
            ))}

            <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <span className="text-amber-600 text-sm mt-0.5">⚠️</span>
              <p className="text-sm text-amber-800 leading-relaxed">
                আয়কর আইন ২০২৩-এর ১১৮ ধারার নির্দেশনা অনুযায়ী প্রাইজবন্ড
                পুরস্কারের অর্থ হতে <strong>২০% হারে উৎসে কর</strong> কর্তন করার
                বিধান রয়েছে।
              </p>
            </div>
          </div>
        </details>

        <div className="space-y-4">
          {prizes.map((prize) => {
            const s = TIER_STYLES[prize.tier] || TIER_STYLES[5];
            return (
              <div
                key={prize.tier}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <div
                  className={`flex items-center justify-between px-4 sm:px-5 py-3 border-b ${s.head}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-lg ${s.badge}`}
                    >
                      {prize.label}
                    </span>
                    <span className={`text-sm font-semibold ${s.amount}`}>
                      {formatAmount(prize.amount)}
                    </span>
                  </div>
                  <span className={`text-xs ${s.count}`}>
                    {prize.numbers.length} জন বিজয়ী
                  </span>
                </div>

                <div className="px-4 sm:px-5 py-4">
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {prize.numbers.map((num) => (
                      <span
                        key={num}
                        className={`font-mono text-xs sm:text-sm font-bold text-center px-2 py-2 rounded-xl border tracking-widest ${s.num}`}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center space-y-1">
          <p className="text-xs text-gray-400">
            আয়কর আইন ২০২৩-এর ১১৮ ধারা অনুযায়ী পুরস্কারের অর্থ হতে ২০% হারে
            উৎসে কর কর্তন প্রযোজ্য
          </p>
          <p className="text-xs text-gray-300">
            আপলোড: checkerpricebond@gmail.com · {formatDate(draw.uploadedAt)}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default SingleDraw;
