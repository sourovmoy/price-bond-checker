import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import Container from "../Container/Container";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getFirebaseErrorMessage } from "../../../utils/firebaseErrors";
import Loading from "../../Loading/Loading";
import { MdEmail, MdRefresh } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";

const GoogleBtn = () => {
  const { signInWithGoogle, loading, verifyEmail, auth } = useAuth();
  const axios = useAxiosSecure();
  const [spinner, setSpinner] = useState(false);
  const [resendSpinner, setResendSpinner] = useState(false);
  const [isWaitingForVerify, setIsWaitingForVerify] = useState(false);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isWaitingForVerify && auth.currentUser) {
      intervalRef.current = setInterval(async () => {
        try {
          await auth.currentUser.reload();
          await auth.currentUser.getIdToken(true);
          if (auth.currentUser.emailVerified) {
            toast.success("আপনার ইমেইল সফলভাবে ভেরিফাইড হয়েছে!");
            clearInterval(intervalRef.current);
            setIsWaitingForVerify(false);
            navigate("/");
          }
        } catch (error) {
          console.log(error.message);
        }
      }, 5000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isWaitingForVerify, auth.currentUser, navigate]);

  const handleResendEmail = async () => {
    if (!auth.currentUser) return;
    setResendSpinner(true);
    try {
      await verifyEmail(auth.currentUser);
      toast.success("আবারো একটি নতুন ভেরিফিকেশন লিঙ্ক পাঠানো হয়েছে।");
    } catch (error) {
      toast.error(
        getFirebaseErrorMessage(error) || "মেইল পাঠাতে ব্যর্থ হয়েছে।",
      );
    } finally {
      setResendSpinner(false);
    }
  };

  const handelSignIn = async () => {
    setSpinner(true);
    try {
      const userCredential = await signInWithGoogle();
      const firebaseUser = userCredential.user;
      await verifyEmail(firebaseUser);
      const newUser = {
        name: firebaseUser?.displayName,
        phone: null,
        imageUrl: firebaseUser?.photoURL,
      };
      await axios.post("/user", newUser);
      setIsWaitingForVerify(true);
    } catch (error) {
      console.log(error.message);
      toast.error(
        getFirebaseErrorMessage(error) ||
          error.message ||
          "নিবন্ধন ব্যর্থ হয়েছে",
      );
    } finally {
      setSpinner(false);
    }
  };

  if (loading || spinner) return <Loading />;
  if (isWaitingForVerify) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-90px)] px-4">
          <div className="w-full max-w-md p-8 border border-gray-100 rounded-2xl shadow-xl bg-white text-center space-y-5 animate-fadeIn">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 text-[#244B43]">
              <MdEmail className="text-3xl animate-bounce" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              আপনার ইমেইল চেক করুন!
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              আমরা আপনার ইমেইলে একটি লিঙ্ক পাঠিয়েছি। মেইলটি ওপেন করে লিঙ্কে
              ক্লিক করলেই **এই পেজটি অটোমেটিক লোড হয়ে আপনাকে অ্যাপে নিয়ে যাবে**।
              আপনার নতুন করে লগইন করতে হবে না।
            </p>

            {/* ব্যাকগ্রাউন্ড পোলিং স্ট্যাটাস ইন্ডিকেটর */}
            <div className="flex items-center justify-center gap-2 pt-2 text-xs font-medium text-gray-500 bg-gray-50 py-2.5 rounded-xl border border-gray-100">
              <AiOutlineLoading className="animate-spin text-base text-[#244B43]" />
              আপনার ভেরিফিকেশনের জন্য অপেক্ষা করা হচ্ছে...
            </div>

            {/* রিমেইল অপশন (যদি মেইল না এসে থাকে) */}
            <div className="pt-2 border-t border-gray-100 text-center">
              <span className="text-xs text-gray-500">মেইল পাননি? </span>
              <button
                onClick={handleResendEmail}
                disabled={resendSpinner}
                className="text-xs font-bold text-[#244B43] hover:text-[#446E65] inline-flex items-center gap-1 disabled:opacity-50"
              >
                {resendSpinner ? (
                  "পাঠানো হচ্ছে..."
                ) : (
                  <>
                    আবার পাঠান <MdRefresh className="text-sm" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Container>
    );
  }
  return (
    <button
      onClick={handelSignIn}
      className="inline-flex w-full items-center justify-center gap-3 bg-white text-[#1f1f1f] font-medium px-5 py-2.5 border border-[#747775] rounded-full shadow-sm hover:shadow-md hover:bg-[#f8fafc] active:scale-[0.98] transition-all duration-200 select-none cursor-pointer text-base"
    >
      {/* react-icons থেকে গুগল লোগো */}
      <FcGoogle className="text-xl sm:text-md" />

      <span>গুগল দিয়ে সাইন-ইন করুন</span>
    </button>
  );
};

export default GoogleBtn;
