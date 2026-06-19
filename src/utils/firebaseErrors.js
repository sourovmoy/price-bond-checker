export const getFirebaseErrorMessage = (error) => {
  const code = error?.code;

  const messages = {
    "auth/email-already-in-use":
      "এই ইমেইলটি আগে থেকেই নিবন্ধিত। লগইন করার চেষ্টা করুন।",

    "auth/invalid-email": "সঠিক ইমেইল অ্যাড্রেস দিন।",

    "auth/weak-password":
      "পাসওয়ার্ড অনেক দুর্বল। কমপক্ষে ৬ অক্ষর ব্যবহার করুন।",

    "auth/missing-password": "পাসওয়ার্ড দেওয়া আবশ্যক।",

    "auth/missing-email": "ইমেইল দেওয়া আবশ্যক।",

    "auth/operation-not-allowed":
      "ইমেইল/পাসওয়ার্ড দিয়ে নিবন্ধন বন্ধ রয়েছে। সাপোর্টে যোগাযোগ করুন।",

    "auth/network-request-failed":
      "নেটওয়ার্ক সমস্যা। আপনার ইন্টারনেট সংযোগ চেক করুন।",

    "auth/user-not-found":
      "এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি। প্রথমে নিবন্ধন করুন।",

    "auth/wrong-password": "ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।",

    "auth/invalid-credential": "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।",

    "auth/too-many-requests":
      "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।",

    "auth/user-disabled":
      "এই অ্যাকাউন্টটি নিষ্ক্রিয় করা হয়েছে। সাপোর্টে যোগাযোগ করুন।",
  };

  return messages[code] || "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।";
};
