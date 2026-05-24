import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../Firebase/firebase.config";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
