import React from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet, useLocation } from "react-router";
import { ImWhatsapp } from "react-icons/im";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  const location = useLocation();
  const message = `হ্যালো, আমি এই ওয়েবসাইট নিয়ে জানতে চাই: ${window.location.origin}${location.pathname}`;
  return (
    <div className="relative">
      <header>
        <Navbar />
      </header>
      <main className="mt-18">
        <Outlet />
      </main>
      <footer>
        <div>
          <a
            href={`https://wa.me/8801302172521?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp এ মেসেজ করুন"
            title="WhatsApp এ মেসেজ করুন"
            className="fixed bottom-7 right-3 sm:right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-3xl text-white shadow-lg transition hover:scale-110 animate-bounce"
          >
            <ImWhatsapp />
          </a>
        </div>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
