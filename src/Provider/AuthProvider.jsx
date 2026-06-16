import React, { useEffect, useState, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
  signInWithEmailAndPassword,
  sendEmailVerification, // ✉️ ইমেইল ভেরিফিকেশনের জন্য ইমপোর্ট করা হলো
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";

// ১. সেন্ট্রাল auth ইনস্ট্যান্স তৈরি
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ইমেইল-পাসওয়ার্ড দিয়ে নতুন ইউজার তৈরি
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

  // ✉️ ইমেইল ভেরিফিকেশন লিঙ্ক পাঠানোর ফাংশন
  const verifyEmail = async (currentUser) => {
    // যদি প্যারামিটারে ইউজার পাস না করা হয়, তবে কারেন্টলি লগইন থাকা ইউজারকে টার্গেট করবে
    const targetUser = currentUser || auth.currentUser;
    if (!targetUser)
      throw new Error("No authenticated user found to verify email");

    try {
      await sendEmailVerification(targetUser);
      return true;
    } catch (error) {
      console.error("Firebase Email Verification Error:", error);
      throw error;
    }
  };

  // ইমেইল-পাসওয়ার্ড দিয়ে লগইন
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

  // লগআউট
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // ইউজারের প্রোফাইল (নাম ও ছবি) আপডেট
  const updateUserProfile = async (name, photo) => {
    if (!auth.currentUser) throw new Error("No authenticated user found");

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      // ফায়ারবেসের ইন্টারনাল রেফারেন্স ব্রেক করে ফ্রেশ অবজেক্ট স্টেট আপডেট
      const updatedUser = { ...auth.currentUser };
      setUser(updatedUser);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // অথেনটিকেশন স্টেট অবজার্ভার
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ⚡ useMemo-তে 'verifyEmail' ফাংশনটি এক্সপোজ করা হয়েছে
  const authInfo = useMemo(
    () => ({
      auth,
      user,
      setUser,
      loading,
      createUser,
      verifyEmail, // 🟢 এখন RegisterPage থেকে সরাসরি এটি কল করা যাবে
      logout,
      updateUserProfile,
      signIn,
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
