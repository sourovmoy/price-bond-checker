import React from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet } from "react-router";
import Container from "../Components/Shared/Container/Container";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="mt-18">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
