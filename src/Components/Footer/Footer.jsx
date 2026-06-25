import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "../Shared/Logo/Logo";
import { Link } from "react-router";
import { TbWorld } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-12 pb-6 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* সেকশন ১: প্রজেক্টের বিবরণ */}
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="text-sm text-neutral-400 leading-relaxed">
            আপনার প্রাইজবন্ডের রেজাল্ট চেক করার একটি নির্ভরযোগ্য এবং সহজ
            প্ল্যাটফর্ম। খুব দ্রুত এবং নির্ভুলভাবে আপনার বন্ডের ড্র মিলিয়ে নিন।
          </p>
        </div>

        {/* সেকশন ২: কুইক লিংকস */}
        <div className="flex flex-col md:items-center">
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm tracking-wider uppercase">
              প্রয়োজনীয় লিংক
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/add-price-bond"
                  className="hover:text-emerald-400 transition-colors duration-200"
                >
                  বন্ড যোগ করুন
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-price-bonds"
                  className="hover:text-emerald-400 transition-colors duration-200"
                >
                  বন্ড চেক করুন
                </Link>
              </li>
              <li>
                <a
                  href="/draw-results"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors duration-200"
                >
                  ড্র এর ফলাফল
                </a>
              </li>
              <li>
                <Link
                  to={"/about-us"}
                  className="hover:text-emerald-400 transition-colors duration-200"
                >
                  আমাদের সম্পর্কে
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* সেকশন ৩: সোশ্যাল মিডিয়া ও যোগাযোগ */}
        <div className="flex flex-col md:items-end">
          <h3 className="text-white font-semibold mb-3 text-sm tracking-wider uppercase">
            যোগাযোগ ও সোশ্যাল মিডিয়া
          </h3>
          <p className="text-sm text-neutral-400 mb-4">
            যেকোনো জিজ্ঞাসা বা সাজেশনে আমাদের সাথে থাকুন।
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/sourovmmoysanju"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-neutral-800 hover:bg-emerald-600 hover:text-white rounded-full transition-all duration-300"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="https://github.com/sourovmoy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-neutral-800 hover:bg-emerald-600 hover:text-white rounded-full transition-all duration-300"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/sourov-dash"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-neutral-800 hover:bg-emerald-600 hover:text-white rounded-full transition-all duration-300"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://dev-sourov-dash.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-neutral-800 hover:bg-emerald-600 hover:text-white rounded-full transition-all duration-300"
            >
              <TbWorld size={18} />
            </a>
          </div>
        </div>
      </div>

      <hr className="border-neutral-800 my-6" />

      {/* কপিরাইট নোটিশ */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
        <p>
          © {new Date().getFullYear()} PriceBond Checker. All rights reserved.
        </p>
        <p>
          Developed by{" "}
          <a
            href="https://github.com/sourovmoy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:underline font-medium"
          >
            Sourov Dash
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
