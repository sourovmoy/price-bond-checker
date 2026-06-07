// import React, { useContext } from "react";
import Banner from "../Components/Home/Banner";
import Loading from "../Components/Loading/Loading";
import { AuthContext } from "../Provider/AuthContext";

const Home = () => {
  // const user = useContext(AuthContext);

  return (
    <div className="">
      <Banner />
      <Loading />
    </div>
  );
};

export default Home;
