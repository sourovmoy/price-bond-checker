import React from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet } from "react-router";
import Container from "../Components/Shared/Container/Container";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="mt-18">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
