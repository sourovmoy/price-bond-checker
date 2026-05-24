import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import AddPriceBond from "../Pages/AddPriceBond";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
    ],
  },
]);
