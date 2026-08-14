import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import UserTableSkeleton from "../../../Components/Skeleton/UserTableSkeleton";

const Users = () => {
  const axios = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await axios.get("/users-collection");
      return res.data.user;
    },
  });

  const handleDelete = async (email) => {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই কাজটি পরে আর ফিরিয়ে আনা যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, মুছে ফেলো!",
      cancelButtonText: "না, বাতিল করো!",
    });

    if (!result.isConfirmed) return;
    try {
      const res = await axios.delete(`/delete-user/${email}`);
      if (res.data.result.acknowledged || res.data.result2.acknowledged) {
        Swal.fire({
          title: "মুছে ফেলা হয়েছে!",
          text: "সফলভাবে মুছে ফেলা হয়েছে!",
          icon: "success",
        });
      }
      refetch();
    } catch (error) {
      Swal.fire({
        title: "ব্যর্থ হয়েছে!",
        text: "বন্ড মুছতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        icon: "error",
      });
    }
  };
  if (isError) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>ডেটা লোড করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।</p>
      </div>
    );
  }

  if (isLoading) return <UserTableSkeleton />;

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-sm gap-2">
        <span className="text-4xl">👥</span>
        <p>কোনো ইউজার পাওয়া যায়নি।</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-gray-800">ইউজার সংখ্যা</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          মোট {users.length}টি ইউজার পাওয়া গেছে
        </p>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="w-full text-left border-collapse text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider border-b">
            <tr>
              <th className="py-2 px-3">Photo</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users?.map((user) => {
              const imageSrc = user?.photoURL;

              return (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Photo Column */}
                  <td className="py-1 px-2">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={user.name || "User"}
                        className="w-8 h-8 rounded-full object-cover border border-gray-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      // ছবি না থাকলে নাম থেকে প্রথম অক্ষর নিয়ে ডিফল্ট অবতার
                      <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                    )}
                  </td>

                  {/* Name Column */}
                  <td className="py-1 px-2 font-medium text-gray-900">
                    {user.name || "N/A"}
                  </td>

                  {/* Email Column */}
                  <td className="py-1 px-2 text-gray-500">
                    {user.email || "No Email Provided"}
                  </td>
                  <td className="text-gray-500 text-center text-xs">
                    <span className="rounded-2xl bg-green-200 px-2 py-1">
                      {user.role.toUpperCase() || "Member"}
                    </span>
                  </td>
                  <td className="px-2 py-1">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDelete(user.email)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                        title="মুছুন"
                      >
                        <MdDelete size={22} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
