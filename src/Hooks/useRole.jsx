import React from "react";

import useAuth from "./useAuth";

import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();

  const axios = useAxiosSecure();

  const { data = { role: "member" }, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: user?.email && !!user,

    queryFn: async () => {
      try {
        const res = await axios.get("/user/role");
        return res?.data;
      } catch (error) {
        console.log(error.message);

        if ([404, 401, 403].includes(error.response?.status)) {
          return { role: "member" };
        }

        throw error;
      }
    },

    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    role: data.role,

    roleLoading: isLoading,
  };
};

export default useRole;
