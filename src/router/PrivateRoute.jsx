import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import DashboardSkeleton from "../Components/Skeleton/DashboardSkeleton";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const isVerified = user?.emailVerified;

  useEffect(() => {
    if (loading) return;

    if (!user) {
      toast.error("অনুগ্রহ করে প্রথমে লগইন করুন");
    } else if (!isVerified) {
      toast.error("অনুগ্রহ করে আপনার ইমেইল ভেরিফাই করুন");
    }
  }, [user, loading, isVerified]);

  if (loading) return <DashboardSkeleton />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isVerified) {
    return <Navigate to="/verify-email" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
