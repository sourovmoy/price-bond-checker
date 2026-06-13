import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading/Loading";
import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // টোস্ট মেসেজকে useEffect-এ নিয়ে আসা হয়েছে যেন শুধু একবারই ট্রিপল বা লুপ ছাড়া দেখায়
  useEffect(() => {
    if (!loading && !user) {
      toast.error("অনুগ্রহ করে প্রথমে লগইন করুন");
    }
  }, [user, loading]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    // replace: true দেওয়ার কারণে ব্রাউজারের ব্যাক বাটনে ক্লিক করলে ইউজার আবার আটকে যাবে না
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // অতিরিক্ত div বাদ দিয়ে React Fragment ব্যবহার করা হয়েছে
  return <>{children}</>;
};

export default PrivateRoute;
