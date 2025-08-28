import { useQuery } from "@tanstack/react-query";
import { getBaseUrl } from "../api-client";

interface IFilter {
  page: number;
  limit: number;
  category?: string[];
  collection?: string[];
  sort?: string;
}

const TODAY_PICK_QUERY = {
  todayPick: () => ["today-pick"],
  todayPickFilter: (filters: IFilter) => [
    ...TODAY_PICK_QUERY.todayPick(),
    filters,
  ],
};

const getTodayPick = async (args: IFilter) => {
  const { category, collection, sort } = args;
  const params = new URLSearchParams();
  params.append("page", String(args.page));
  params.append("limit", String(args.limit));
  if (category?.length) params.append("category", category.join(","));
  if (collection?.length) params.append("collection", collection.join(","));
  if (sort) params.append("sort", sort);

  try {
    const response = await fetch(
      `${getBaseUrl()}/items/today-pick?${params.toString()}`,
    );
    return response.json();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export function useGetTodayPick(args: IFilter) {
  return useQuery({
    queryKey: TODAY_PICK_QUERY.todayPickFilter(args),
    queryFn: () => getTodayPick(args),
    staleTime: 5 * 1000,
    placeholderData: (previousData) => previousData,
  });
}
