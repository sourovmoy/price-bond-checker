import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // ✅ ইমপোর্ট করুন
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
  const queryClient = useQueryClient(); // ✅ কুয়েরি ক্লিয়ার/রিফেচ করার জন্য
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // 🔄 ১. useQuery দিয়ে ডাটাবেজ থেকে লেটেস্ট ডাটা নিয়ে আসা
  const { data: dbUser, isLoading: isDbLoading } = useQuery({
    queryKey: ["my-profile", user?.email],
    enabled: !!user?.email, // ইউজারের ইমেইল থাকলেই কেবল রান হবে
    queryFn: async () => {
      const res = await axios.get("/user/me");
      return res.data;
    },
  });

  // ✅ ডাটাবেজ থেকে ডাটা আসবামাত্র ফর্মের ইনপুট ফিল্ডে ডিফল্ট ভ্যালু সেট হবে
  useEffect(() => {
    if (dbUser) {
      setValue("name", dbUser.name || user?.displayName || "");
      setValue("phone", dbUser.phone || "");
      if (dbUser.imageUrl) {
        setPreview(dbUser.imageUrl);
      }
    }
  }, [dbUser, user, setValue]);

  // 🚀 ২. useMutation দিয়ে প্রোফাইল আপডেট করার লজিক
  const profileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axios.patch("/user/update-profile", updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");

      // 🔥 এই লাইনটিই ম্যাজিক করবে: ডাটাবেজ থেকে ডাটা অটো-রিফেচ (Refetch) করবে
      queryClient.invalidateQueries({ queryKey: ["my-profile", user?.email] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("প্রোফাইল আপডেট ব্যর্থ হয়েছে!");
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const phone = data?.phone;

      let photoURL = preview || user?.photoURL || "";
      const formattedPhone = phone.startsWith("+88") ? phone : `+88${phone}`;

      const file = data?.photo?.[0];
      if (file) {
        const uploaded = await uploadImage(file);
        photoURL = uploaded?.secureUrl || photoURL;
      }

      // Firebase profile update
      if (user) {
        await updateUserProfile(data.name, photoURL);
      }

      // ✅ React Query Mutation ট্রিগার করা হচ্ছে
      profileMutation.mutate({
        name: data.name,
        imageUrl: photoURL,
        phone: formattedPhone,
      });
    } catch (error) {
      console.log(error.message);

      toast.error("ছবি আপলোড বা ফায়ারবেস আপডেটে সমস্যা হয়েছে!");
    }
  };

  // ✅ লোডিং হ্যান্ডলিং (ফায়ারবেস অথ অথবা রিয়্যাক্ট কুয়েরি যেকোনো একটি লোড হলে স্কেলেটন দেখাবে)
  if (loading || isDbLoading) return <MyProfileSkeleton />;

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

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              মোবাইল নম্বর
            </label>
            <input
              type="tel"
              className="block w-full px-3.5 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-[#244B43] transition-all"
              placeholder="01XXXXXXXXX"
              {...register("phone", {
                required: "মোবাইল নাম্বার দেওয়া আবশ্যক",
                minLength: { value: 11, message: "কমপক্ষে ১১ ডিজিট হতে হবে" },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-[10px] mt-1">
                ⚠️ {errors.phone.message}
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
            disabled={profileMutation.isPending} // ✅ রিয়্যাক্ট কুয়েরির ডিফল্ট লোডিং স্টেট
            className="w-full font-semibold text-white py-2.5 rounded-xl transition-all shadow-md bg-gradient-to-br from-[#244B43] to-[#446E65] hover:brightness-110 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
          >
            {profileMutation.isPending ? (
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
