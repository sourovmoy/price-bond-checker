import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";

const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};

export default useAuth;
