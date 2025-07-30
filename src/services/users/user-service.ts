import { BASE_URL } from "../config";
import { useQuery } from "@tanstack/react-query";
import { UserM } from "./user-model";

export const PROFILE_QUERY = {
  user: () => ["userProfile"],
  userProfile: (id: number) => ({
    queryKey: [...PROFILE_QUERY.user(), id],
    queryFn: () => fetchUserProfile(id),
    staleTime: 5 * 1000,
  }),
};

export const fetchUserProfile = async (id: number): Promise<UserM> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export function useUserProfile(id: number | string) {
  const numericId = typeof id === "string" ? Number(id) : id;
  return useQuery(PROFILE_QUERY.userProfile(numericId));
}
