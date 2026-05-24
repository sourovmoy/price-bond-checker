import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"}>
      <h1 className="text-xl md:text-2xl font-bold">
        <span className="text-green-500">Price Bond</span> Checker
      </h1>
    </Link>
  );
};

export default Logo;
