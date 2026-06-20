import { createBrowserRouter } from "react-router";
import React from "react";
import MainLayout from "../Layout/MainLayout";
import AddPriceBond from "../Pages/AddPriceBond";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import Loading from "../Components/Loading/Loading";
import About from "../Pages/About";
import DashBoardLayout from "../Layout/DashBoardLayout";
import PrivateRoute from "./PrivateRoute";
import VerifyEmailPage from "../Pages/VerifyEmailPage";
import UserDashboard from "../Pages/Dashboard/User/UserDashboard";
import MyBonds from "../Pages/Dashboard/User/MyBonds";
import MyProfile from "../Pages/Dashboard/User/MyProfile";
import DashboardSkeleton from "../Components/Skeleton/DashboardSkeleton";
import AdminRoute from "./AdminRoute";
import AdminDashboardLayout from "../Layout/AdminDashboardLayout";
import AdminDashBoard from "../Pages/Dashboard/Admin/AdminDashBoard";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import AllPricebonds from "../Pages/Dashboard/Admin/AllPricebonds";
import UsersBond from "../Pages/Dashboard/Admin/UsersBond";
import UploadResult from "../Pages/Dashboard/Admin/UploadResult";
import ForgotPassword from "../Pages/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    hydrateFallbackElement: <Loading />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/add-price-bond",
        element: (
          <PrivateRoute>
            <AddPriceBond />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmailPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <DashboardSkeleton />,
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "/dashboard/my-price-bonds",
        element: <MyBonds />,
      },
      {
        path: "/dashboard/my-profile",
        element: <MyProfile />,
      },
    ],
  },
  {
    path: "/dashboard/admin",
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <DashboardSkeleton />,
    element: (
      <AdminRoute>
        <AdminDashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashBoard />,
      },
      {
        path: "/dashboard/admin/all-bonds",
        element: <AllPricebonds />,
      },
      {
        path: "/dashboard/admin/my-profile",
        element: <AdminProfile />,
      },
      {
        path: "/dashboard/admin/user-bonds/:id",
        element: <UsersBond />,
      },
      {
        path: "/dashboard/admin/user-bonds/:id",
        element: <UsersBond />,
      },
      {
        path: "/dashboard/admin/upload-result",
        element: <UploadResult />,
      },
    ],
  },
]);
