import React, { useEffect, useState, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";

// ১. সেন্ট্রাল auth ইনস্ট্যান্স তৈরি
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ইমেইল-পাসওয়ার্ড দিয়ে নতুন ইউজার তৈরি
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

  // ইমেইল-পাসওয়ার্ড দিয়ে লগইন
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

      // ফায়ারবেসের ইন্টারনাল রেফারেন্স ব্রেক করে ফ্রেশ অবজেক্ট স্টেট আপডেট
      const updatedUser = { ...auth.currentUser };
      setUser(updatedUser);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // ওটিপি পাঠানোর মূল ফাংশন
  const sendOtpToPhone = async (phoneNumber, recaptchaVerifier) => {
    setLoading(true);
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier,
      );
      setLoading(false);
      return confirmationResult;
    } catch (error) {
      setLoading(false);
      throw error;
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

  // ⚡ সংশোধন: useMemo-র ভেতরে মেইন 'auth' অবজেক্টটি পাস করা হয়েছে
  const authInfo = useMemo(
    () => ({
      auth, // 🟢 এখন RegisterPage বা অন্য যেকোনো ফাইল সহজেই এই auth রিড করতে পারবে
      user,
      setUser,
      loading,
      createUser,
      logout,
      updateUserProfile,
      sendOtpToPhone,
      signIn,
    }),
    [user, loading], // যেহেতু auth অবজেক্টটি স্ট্যাটিক, তাই ডিপেন্ডেন্সিতে শুধু ইউজার ও লোডিং থাকবে
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
