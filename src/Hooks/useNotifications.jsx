import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useInfiniteQuery } from "@tanstack/react-query";

const useNotifications = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  return useInfiniteQuery({
    queryKey: ["notifications", user?.email],
    enabled: !!user?.email,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get(`/notification?page=${pageParam}`);
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

export default useNotifications;
