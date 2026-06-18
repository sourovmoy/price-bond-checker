import React from "react";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";
import Unauthorized from "../Pages/Unauthorized";
import { Navigate } from "react-router";
import Loading from "../Components/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading || loading) return <Loading />;

  if (!user) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Unauthorized />;

  return children;
};

export default AdminRoute;
