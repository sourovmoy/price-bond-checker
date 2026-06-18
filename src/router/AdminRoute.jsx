import React from "react";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";
import Unauthorized from "../Pages/Unauthorized";
import { Navigate } from "react-router";
import Loading from "../Components/Loading/Loading";
import DashboardSkeleton from "../Components/Skeleton/DashboardSkeleton";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading || loading) return <DashboardSkeleton />;


  if (!user) return <Navigate to="/login" replace={true} />;

  if (role !== "admin") return <Unauthorized />;

  return children;
};

export default AdminRoute;
