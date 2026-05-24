import React from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="mt-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
