export const getFirebaseErrorMessage = (error) => {
  const code = error?.code;

  const messages = {
    "auth/email-already-in-use":
      "This email is already registered. Try logging in instead.",

    "auth/invalid-email": "Please enter a valid email address.",

    "auth/weak-password": "Password is too weak. Use at least 6 characters.",

    "auth/missing-password": "Password is required.",

    "auth/missing-email": "Email is required.",

    "auth/operation-not-allowed":
      "Email/password sign-up is disabled. Contact support.",

    "auth/network-request-failed":
      "Network error. Please check your internet connection.",

    "auth/user-not-found":
      "No account found with this email. Please sign up first.",

    "auth/wrong-password": "Incorrect password. Please try again.",

    "auth/invalid-credential": "Invalid email or password.",

    "auth/too-many-requests": "Too many attempts. Please try again later.",

    "auth/user-disabled": "This account has been disabled. Contact support.",
  };

  return messages[code] || "Something went wrong. Please try again.";
};
