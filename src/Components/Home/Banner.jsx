import React, { useState } from "react";
import banner from "../../assets/hero-banner.png";

const Banner = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full">
      {/* Skeleton — ছবি লোড হওয়ার আগে দেখাবে */}
      {!loaded && (
        <div className="w-full h-40 md:h-80 lg:h-96 bg-gray-200 animate-pulse rounded-sm" />
      )}

      {/* Banner image */}
      <img
        src={banner}
        alt="Banner"
        onLoad={() => setLoaded(true)}
        className={`w-full h-40 md:h-100 transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0 absolute inset-0"
        }`}
      />
    </div>
  );
};

export default Banner;
