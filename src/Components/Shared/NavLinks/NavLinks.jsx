import React from "react";
import { NavLink } from "react-router";

const NavLinks = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 text-gray-700">
      <NavLink className={"font-semibold hover:text-gray-500"} to={"/"}>
        Home
      </NavLink>
      <NavLink
        className={"font-semibold hover:text-gray-500 cursor-pointer"}
        to={"/add-price-bond"}
      >
        Add Price Bond
      </NavLink>
      <NavLink
        className={"font-semibold hover:text-gray-500 cursor-pointer"}
        to={"/about-us"}
      >
        About
      </NavLink>
    </div>
  );
};

export default NavLinks;
