import React from "react";
import NavLinks from "./NavLinks/NavLinks";

const LeftNavbar = () => {
  return (
    <div className="hidden md:flex">
      <NavLinks />
    </div>
  );
};

export default LeftNavbar;
