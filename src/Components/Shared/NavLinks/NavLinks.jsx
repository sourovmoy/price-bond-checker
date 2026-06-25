import React from "react";
import { NavLink } from "react-router";

const NavLinks = ({ setIsMenuModalOpen }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-700">
      <NavLink
        onClick={() => setIsMenuModalOpen(false)}
        className={"font-semibold hover:text-gray-500"}
        to={"/"}
      >
        Home
      </NavLink>
      <NavLink
        onClick={() => setIsMenuModalOpen(false)}
        className={"font-semibold hover:text-gray-500 cursor-pointer"}
        to={"/add-price-bond"}
      >
        Add Bond
      </NavLink>
      <NavLink
        onClick={() => setIsMenuModalOpen(false)}
        className={"font-semibold hover:text-gray-500 cursor-pointer"}
        to={"/about-us"}
      >
        About
      </NavLink>
      <NavLink
        onClick={() => setIsMenuModalOpen(false)}
        className={"font-semibold hover:text-gray-500 cursor-pointer"}
        to={"/draw-results"}
      >
        Draw Results
      </NavLink>
    </div>
  );
};

export default NavLinks;
