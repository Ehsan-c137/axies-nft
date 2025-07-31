import { useMutation } from "@tanstack/react-query";
import { PROFILE_QUERY } from "../users/user-service";
import { useQueryClient } from "@tanstack/react-query";

const logoutUser = async () => {
  const response = await fetch("api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Logout failed");
  }

  return response.json();
};

export function useLogoutMutation(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries(PROFILE_QUERY.userProfile(id));
    },
    onError: (error: Error) => {
      console.error("Logout error:", error);
    },
  });
}
