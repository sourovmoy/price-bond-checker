import React from "react";
import { NavLink } from "react-router";

const LeftNavbar = () => {
  return (
    <div className="hidden md:flex items-center gap-3">
      <NavLink className={"font-semibold hover:text-gray-500"} to={"/"}>
        Home
      </NavLink>
      <NavLink to={"/add-price-bond"}>Add Price Bond</NavLink>
    </div>
  );
};

export default LeftNavbar;
