import { useMutation } from "@tanstack/react-query";
import { PROFILE_QUERY } from "../users/user-service";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/auth/auth-provider";

export function useLogoutMutation() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
    onError: (error: Error) => {
      console.error("Logout error:", error);
    },
  });
}

export function useLoginMutation() {
  const { login } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      if (user?.id) {
        queryClient.setQueryData([...PROFILE_QUERY.user(), user.id], user);
      }
    },
    onError: (error: Error) => {
      console.error("Login error:", error);
    },
  });
}

export function useSignupMutation() {
  const { signup } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      console.log(user);
      if (user?.id) {
        queryClient.setQueryData([...PROFILE_QUERY.user(), user.id], user);
      }
    },
    onError: (error: Error) => {
      console.error("Signup error:", error);
    },
  });
}
