import { useMemo } from "react";
import { useAuth } from "@/context/auth/auth-provider";
import { createApiClient } from "@/services/client/api-client";

export const useApiClient = () => {
  const { accessToken } = useAuth();

  const apiClient = useMemo(() => createApiClient(accessToken), [accessToken]);

  return apiClient;
};
