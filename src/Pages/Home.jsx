import React, { useState } from "react";
import Banner from "../Components/Home/Banner";
import Loading from "../Components/Loading/Loading";
import WhyBuy from "../Components/Home/BannerLinks/WhyBuy";
import Benefits from "../Components/Home/BannerLinks/Benefits";
import HowToBuy from "../Components/Home/BannerLinks/HowToBuy";
import DrawAndPrizes from "../Components/Home/BannerLinks/DrawAndPrice";
import BannerLinks from "../Components/Home/BannerLinks/BannerLinks";
import FAQ from "../Components/Home/FAQ/FAQ";
// 🔥 Import BannerLinks and all Bangla content components

const Home = () => {
  // 🎯 Top Active Tab State Manager (Default set to 1 -> Why Buy)
  const [activeTab, setActiveTab] = useState(1);

  // Function to determine which component to render dynamically
  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <WhyBuy />;
      case 2:
        return <Benefits />;
      case 3:
        return <HowToBuy />;
      case 4:
        return <DrawAndPrizes />;
      default:
        return <WhyBuy />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/40 pb-12">
      {/* 1. Main Upper Banner */}
      <Banner />

      {/* 2. Floating Tabs Controller Panel (Passing State via Props) */}
      <BannerLinks activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 3. Dynamic Toggle Content Target Container */}
      <div className="w-full transition-all duration-300 mt-10">
        {renderTabContent()}
      </div>
      <FAQ />

      {/* Loading state handle korar jonno context flow template block */}
      <Loading />
    </div>
  );
};

export default Home;
