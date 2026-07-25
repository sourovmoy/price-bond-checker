import React from "react";

const UserTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 15 });

  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-5">
        <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-44 bg-gray-200 rounded"></div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-3">Photo</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4 text-center">Role</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {skeletonRows.map((_, index) => (
              <tr key={index}>
                {/* Photo Skeleton */}
                <td className="py-1 px-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                </td>

                {/* Name Skeleton */}
                <td className="py-1 px-2">
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                </td>

                {/* Email Skeleton */}
                <td className="py-1 px-2">
                  <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </td>

                {/* Role Skeleton */}
                <td className="py-1 px-2 text-center">
                  <div className="h-5 w-16 bg-gray-200 rounded-2xl mx-auto"></div>
                </td>

                {/* Action Button Skeleton */}
                <td className="py-1 px-2">
                  <div className="w-7 h-7 bg-gray-200 rounded-lg mx-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTableSkeleton;
