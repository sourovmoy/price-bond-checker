import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { MdEmail, MdRefresh, MdLogout } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";

import Container from "../Components/Shared/Container/Container";
import useAuth from "../Hooks/useAuth";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";

const RESEND_COOLDOWN_SEC = 60;

const VerifyEmailPage = () => {
  const { user, auth, verifyEmail, logout } = useAuth();
  const navigate = useNavigate();

  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0); // seconds remaining before resend allowed
  const pollingRef = useRef(null);
  const cooldownRef = useRef(null);

  // Redirect if already verified or not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (user.emailVerified) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  // Poll Firebase every 3s to detect when user clicks the link
  useEffect(() => {
    if (!auth.currentUser) return;

    pollingRef.current = setInterval(async () => {
      try {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          clearInterval(pollingRef.current);
          toast.success("ইমেইল সফলভাবে ভেরিফাইড! স্বাগতম 🎉");
          navigate("/", { replace: true });
        }
      } catch (err) {
        // console.error("Polling error:", err);
      }
    }, 3000);

    return () => clearInterval(pollingRef.current);
  }, [auth.currentUser, navigate]);

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(cooldownRef.current);
  }, [cooldown]);

  const handleResend = async () => {
    if (!auth.currentUser || cooldown > 0) return;
    setIsResending(true);
    try {
      await verifyEmail(auth.currentUser);
      toast.success("নতুন ভেরিফিকেশন লিঙ্ক পাঠানো হয়েছে।");
      setCooldown(RESEND_COOLDOWN_SEC);
    } catch (err) {
      toast.error(getFirebaseErrorMessage(err) || "মেইল পাঠাতে ব্যর্থ হয়েছে।");
    } finally {
      setIsResending(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <Container>
      <div className="flex items-center justify-center min-h-[calc(100vh-90px)] px-4">
        <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl p-8 text-center space-y-6">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-[#EAF2F0]">
            <MdEmail className="text-4xl text-[#244B43]" />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              ইমেইল ভেরিফাই করুন
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              আমরা{" "}
              <span className="font-semibold text-gray-700">{user?.email}</span>{" "}
              ঠিকানায় একটি ভেরিফিকেশন লিঙ্ক পাঠিয়েছি। মেইল খুলে লিঙ্কে ক্লিক
              করলেই এই পেজ অটোমেটিক আপডেট হবে।
            </p>
          </div>

          {/* Polling status */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-xl py-3 px-4">
            <AiOutlineLoading className="animate-spin text-sm text-[#244B43] shrink-0" />
            <span>ভেরিফিকেশনের জন্য অপেক্ষা করা হচ্ছে...</span>
          </div>

          {/* Steps guide */}
          <ol className="text-left text-xs text-gray-600 space-y-2 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <li className="flex gap-2">
              <span className="font-bold text-[#244B43] shrink-0">১.</span>
              আপনার ইমেইল ইনবক্স খুলুন
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[#244B43] shrink-0">২.</span>
              "Verify your email" সাবজেক্টের মেইলটি খুঁজুন (স্প্যাম ফোল্ডারও চেক
              করুন)
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[#244B43] shrink-0">৩.</span>
              মেইলের ভেতরের লিঙ্কে ক্লিক করুন — বাকিটা অটোমেটিক হবে
            </li>
          </ol>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Resend */}
          <div className="space-y-1">
            <p className="text-xs text-gray-500">মেইল পাননি?</p>
            <button
              onClick={handleResend}
              disabled={isResending || cooldown > 0}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#244B43] hover:text-[#446E65] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isResending ? (
                <>
                  <AiOutlineLoading className="animate-spin text-sm" />
                  পাঠানো হচ্ছে...
                </>
              ) : cooldown > 0 ? (
                `আবার পাঠান (${cooldown}s)`
              ) : (
                <>
                  <MdRefresh className="text-base" />
                  আবার পাঠান
                </>
              )}
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            <MdLogout className="text-sm" />
            অন্য অ্যাকাউন্টে লগইন করুন
          </button>
        </div>
      </div>
    </Container>
  );
};

export default VerifyEmailPage;
