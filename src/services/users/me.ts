import { BASE_URL } from "../config";
import { useQuery } from "@tanstack/react-query";
import { UserM } from "./user-model";

export const ME_QUERY = {
  me: () => ["me"],
  meProfile: () => ({
    queryKey: [...ME_QUERY.me()],
    queryFn: () => fetchMeProfile(),
    staleTime: 5 * 1000,
  }),
};

export const fetchMeProfile = async (): Promise<UserM> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching me profile:", error);
    throw error;
  }
};

export function useMeProfile() {
  return useQuery(ME_QUERY.meProfile());
}
