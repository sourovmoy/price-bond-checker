import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import AddPriceBond from "../Pages/AddPriceBond";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import Loading from "../Components/Loading/Loading";
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
        element: <AddPriceBond />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);
