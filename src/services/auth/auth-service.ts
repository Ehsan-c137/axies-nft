import { useMutation } from "@tanstack/react-query";
import { PROFILE_QUERY } from "../users/user-service";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/auth/auth-provider";

export function useLogoutMutation(id: number) {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries(PROFILE_QUERY.userProfile(id));
    },
    onError: (error: Error) => {
      console.error("Logout error:", error);
    },
  });
}
