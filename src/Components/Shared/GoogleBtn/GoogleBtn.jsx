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
  const { signInWithGoogle, loading } = useAuth();
  const axios = useAxiosSecure();
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const handelSignIn = async () => {
    setSpinner(true);
    try {
      const userCredential = await signInWithGoogle();
      const firebaseUser = userCredential.user;

      const newUser = {
        name: firebaseUser?.displayName,
        photoURL: firebaseUser?.photoURL,
        phone: firebaseUser?.phoneNumber,
      };

      await axios.post("/user", newUser);
      navigate("/");
    } catch (error) {
      // console.log(error.message);
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
