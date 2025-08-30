import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PROFILE_QUERY } from "../users/user-service";
import { useAuth } from "@/context/auth/auth-provider";
import { apiClient } from "../api-client";
import { IUser } from "@/types/service/auth";

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
      if (user?.id) {
        queryClient.setQueryData([...PROFILE_QUERY.user(), user.id], user);
      }
    },
    onError: (error: Error) => {
      console.error("Signup error:", error);
    },
  });
}

export function useGetRefreshToken() {
  return useQuery({
    queryKey: ["refreshToken"],
    queryFn: async () => {
      const response = await apiClient.post<
        { accessToken: string; user: IUser },
        { refreshToken: string }
      >("/auth/refresh", {
        refreshToken: "some_refresh_token",
      });
      return response;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function useVerifyOTPMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (otp: string): Promise<{ user: IUser } | null> => {
      const response = await apiClient.post<{ user: IUser }, { otp: string }>(
        "/auth/verify",
        { otp },
      );
      return response;
    },
    onSuccess: (data: { user: IUser } | null) => {
      queryClient.setQueryData(["user"], data?.user);
    },
  });
}
