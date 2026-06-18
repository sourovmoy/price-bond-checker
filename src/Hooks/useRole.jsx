import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axios = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,

    queryFn: async () => {
      const res = await axios.get("/user/role");
      return res.data;
    },

    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    role: data?.role,
    roleLoading: isLoading,
  };
};

export default useRole;
