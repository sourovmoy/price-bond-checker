// MyProfile.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useImageUpload } from "../../../Hooks/useImageUpload";
import MyProfileSkeleton from "../../../Components/Skeleton/MyProfileSkeleton";
import { AiOutlineLoading } from "react-icons/ai";
import { FiCamera } from "react-icons/fi";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { user, loading, updateUserProfile } = useAuth();
  const axios = useAxiosSecure();
  const { uploadImage } = useImageUpload();
  const [spinner, setSpinner] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // ✅ form এ default value set করো
  useEffect(() => {
    if (user) {
      setValue("name", user.displayName || "");
    }
  }, [user, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setSpinner(true);
    try {
      let photoURL = user?.photoURL || "";

      // ছবি পরিবর্তন হলে upload করো
      const file = data?.photo?.[0];
      if (file) {
        const uploaded = await uploadImage(file);
        photoURL = uploaded?.secureUrl || photoURL;
      }

      // Firebase profile update
      await updateUserProfile(data.name, photoURL);

      // Backend update
      await axios.patch("/user/update-profile", {
        name: data.name,
        imageUrl: photoURL,
      });

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      toast.error("প্রোফাইল আপডেট ব্যর্থ হয়েছে!", error);
    } finally {
      setSpinner(false);
    }
  };

  if (loading) return <MyProfileSkeleton />;

  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-400 mt-0.5">আপনার তথ্য আপডেট করুন</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <img
                src={
                  preview ||
                  user?.photoURL ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || "U")}`
                }
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
              <label
                htmlFor="photo"
                className="absolute bottom-0 right-0 bg-[#244B43] text-white p-1.5 rounded-full cursor-pointer hover:bg-[#446E65] transition-colors"
              >
                <FiCamera size={13} />
              </label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("photo")}
                onChange={(e) => {
                  register("photo").onChange(e);
                  handleImageChange(e);
                }}
              />
            </div>
            <p className="text-xs text-gray-400">
              ছবি পরিবর্তন করতে ক্লিক করুন
            </p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              আপনার নাম
            </label>
            <input
              type="text"
              className="block w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all"
              placeholder="আপনার নাম লিখুন"
              {...register("name", { required: "নাম দেওয়া আবশ্যক" })}
            />
            {errors.name && (
              <p className="text-red-500 text-[10px] mt-1">
                ⚠️ {errors.name.message}
              </p>
            )}
          </div>

          {/* Email — readonly */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              ইমেইল অ্যাড্রেস
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="block w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed"
            />
            <p className="text-[10px] text-gray-400 mt-1">
              ইমেইল পরিবর্তন করা যাবে না
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={spinner}
            className="w-full font-semibold text-white py-2.5 rounded-xl transition-all shadow-md bg-gradient-to-br from-[#244B43] to-[#446E65] hover:brightness-110 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
          >
            {spinner ? (
              <>
                আপডেট হচ্ছে...
                <AiOutlineLoading className="animate-spin text-base" />
              </>
            ) : (
              "প্রোফাইল আপডেট করুন"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
