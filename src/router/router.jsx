import { createBrowserRouter } from "react-router";
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
import UserDashboard from "../Pages/Dashboard/UserDashboard";
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
    ],
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage />,
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
    ],
  },
]);
