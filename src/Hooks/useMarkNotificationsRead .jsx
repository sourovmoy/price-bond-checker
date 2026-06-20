// Hooks/useMarkNotificationsRead.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useMarkNotificationsRead = () => {
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.patch("/notification/mark-all-read");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationCount"] });
    },
  });
};

export default useMarkNotificationsRead;
