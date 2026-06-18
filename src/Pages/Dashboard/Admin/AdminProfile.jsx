import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import {
  FiCamera,
  FiMail,
  FiPhone,
  FiShield,
  FiCalendar,
} from "react-icons/fi";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useImageUpload } from "../../../Hooks/useImageUpload";
import useRole from "../../../Hooks/useRole";
import AdminProfileSkeleton from "../../../Components/Skeleton/AdminProfileSkeleton";

const AdminProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axios = useAxiosSecure();
  const { uploadImage } = useImageUpload();
  const { role, roleLoading } = useRole();
  const [spinner, setSpinner] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("name", user.displayName || "");
    }
  }, [user, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    setSpinner(true);
    try {
      let photoURL = user?.photoURL || "";
      const file = data?.photo?.[0];
      if (file) {
        const uploaded = await uploadImage(file);
        photoURL = uploaded?.secureUrl || photoURL;
      }
      await updateUserProfile(data.name, photoURL);
      await axios.patch("/user/update-profile", {
        name: data.name,
        imageUrl: photoURL,
      });
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      toast.error("প্রোফাইল আপডেট ব্যর্থ হয়েছে!");
    } finally {
      setSpinner(false);
    }
  };

  const getRoleBadge = () => {
    if (role === "admin")
      return {
        label: "অ্যাডমিন",
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        icon: <FiShield size={11} />,
      };
  };

  const badge = getRoleBadge();

  const joinedDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  if (roleLoading) return <AdminProfileSkeleton />;

  return (
    <div className="p-2 sm:p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          অ্যাডমিন প্রোফাইল
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          আপনার তথ্য ও অ্যাকাউন্ট ম্যানেজ করুন
        </p>
      </div>

      {/* Profile Header Card */}
      <div className="bg-[#244B43] rounded-xl p-6 mb-4 flex items-center gap-5">
        <div className="relative shrink-0">
          <img
            src={
              preview ||
              user?.photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || "A")}`
            }
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
          />
          <label
            htmlFor="photo"
            className="absolute bottom-0 right-0 bg-white text-[#244B43] p-1.5 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <FiCamera size={12} />
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

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-white font-semibold text-lg truncate">
              {user?.displayName || "Admin"}
            </h2>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}
            >
              {badge.icon}
              {badge.label}
            </span>
          </div>
          <p className="text-white/60 text-sm truncate mt-0.5">{user?.email}</p>

          <div className="flex items-center gap-4 mt-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-white/50 text-xs">
              <FiCalendar size={11} />
              যোগদান: {joinedDate}
            </span>
            <span className="flex items-center gap-1.5 text-white/50 text-xs">
              <FiMail size={11} />
              {user?.emailVerified ? "ভেরিফাইড ✓" : "ভেরিফাই হয়নি"}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Form Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          তথ্য সম্পাদনা
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          {/* Email readonly */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              ইমেইল অ্যাড্রেস
            </label>
            <div className="relative">
              <FiMail
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300"
              />
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="block w-full pl-9 pr-3.5 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              ইমেইল পরিবর্তন করা যাবে না
            </p>
          </div>

          {/* Role readonly */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              অ্যাকাউন্টের ধরন
            </label>
            <div className="relative">
              <FiShield
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300"
              />
              <input
                type="text"
                value={badge.label}
                disabled
                className="block w-full pl-9 pr-3.5 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

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

export default AdminProfile;
