import { BASE_URL } from "../../config";
import { useQuery } from "@tanstack/react-query";
import { TUserFull } from "./user-model";

export const PROFILE_QUERY = {
  user: () => ["userProfile"],
  userProfile: (username: string) => ({
    queryKey: [...PROFILE_QUERY.user(), username],
    queryFn: () => fetchUserProfile(username),
    staleTime: 5 * 1000,
  }),
};

export const fetchUserProfile = async (
  username: string,
): Promise<TUserFull> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export function useUserProfile(username: string) {
  return useQuery(PROFILE_QUERY.userProfile(username));
}
