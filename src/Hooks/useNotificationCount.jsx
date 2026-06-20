// Hooks/useNotificationCount.js
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useNotificationCount = () => {
  const axios = useAxiosSecure();
  const { user } = useAuth();

  return useQuery({
    queryKey: ["notificationCount", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get("/notification/unread-count");
      return res.data.count;
    },
    refetchOnWindowFocus: false,
  });
};

export default useNotificationCount;
