import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";

const Home = () => {
  const user = useContext(AuthContext);
  console.log(user);

  return <div className="text-xl">this is home</div>;
};

export default Home;
