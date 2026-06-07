import React, { useEffect, useState, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
  signInWithPhoneNumber,
  signInWithEmailAndPassword, // 🟢 ADDED: ফোন প্রোভাইডার ইম্পোর্ট
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
      throw err;
    }
  };
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const updateUserProfile = async (name, photo) => {
    if (!auth.currentUser) throw new Error("No authenticated user found");

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      const updatedUser = { ...auth.currentUser };
      setUser(updatedUser);

      return true;
    } catch (error) {
      throw new Error(error.message); // 🔴 UPDATE: এরর থ্রো সিনট্যাক্স ঠিক করা হয়েছে
    }
  };

  // 🔴 FIX: ওটিপি পাঠানোর ফাংশনটি ফায়ারবেসের স্ট্যান্ডার্ড নিয়মে আপডেট করা হয়েছে
  const sendOtpToPhone = async (phoneNumber, recaptchaVerifier) => {
    setLoading(true);
    try {
      // এটি সরাসরি গুগল এপিআই-এর সাথে কানেক্ট করে এসএমএস পাঠাবে
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier,
      );
      setLoading(false);
      return confirmationResult; // এটি ওটিপি কনফার্ম করার অবজেক্ট রিটার্ন করবে
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = useMemo(
    () => ({
      user,
      setUser,
      loading,
      createUser,
      logout,
      updateUserProfile,
      sendOtpToPhone,
      signIn, // 🟢 ADDED: কন্টেক্সটে ফাংশনটি পাস করা হয়েছে
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
