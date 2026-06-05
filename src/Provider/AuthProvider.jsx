import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return result;
    } catch (err) {
      setLoading(false);
      console.error("❌ Firebase Create user error:", err);
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const result = await signOut(auth);
      return result;
    } catch (error) {
      setLoading(false);
      console.error("❌ Firebase signOut error:", error);
      throw error;
    }
  };

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    logout,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
