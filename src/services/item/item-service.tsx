import { useQuery, useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { allProducts } from "@/mocks/data";
import {
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";

interface ItemFilters {
  page?: number;
  limit?: number;
  category?: string[];
  chain?: string[];
  collection?: string[];
}

export type TItem = (typeof allProducts)[0] & {
  status: number;
};

export const ITEM_QUERY = {
  items: () => ["items"],
  itemWithFilter: (filters: ItemFilters) => [...ITEM_QUERY.items(), filters],
  itemDetail: (id: string) => [...ITEM_QUERY.items(), id] as const,
};

export const getItemDetail = async (id: string): Promise<TItem> => {
  try {
    const response = await fetch(`${BASE_URL}/items/${id}`);
    return response.json();
  } catch (error) {
    console.error("failed to fetch item deatil", error);
    throw new Error("Failed to fetch item detail");
  }
};

export const getAllItems = async (args: ItemFilters = {}) => {
  const { page, limit, category, chain, collection } = args;

  const params = new URLSearchParams();
  if (page) params.append("page", String(page));
  if (limit) params.append("limit", String(limit));
  if (category?.length) params.append("category", category.join(","));
  if (chain?.length) params.append("chain", chain.join(","));
  if (collection?.length) params.append("collection", collection.join(","));

  if (page !== undefined && limit !== undefined) {
    const response = await fetch(`${BASE_URL}/items?${params.toString()}`);
    return response.json();
  }

  try {
    const response = await fetch(`${BASE_URL}/items`);
    if (!response.ok) {
      throw new Error("Http error! failed to get items");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Failed to fetch items");
  }
};

export function useGetItemDetail<TData = TItem>(
  id: string,
  options?: Omit<UseQueryOptions<TItem, Error, TData>, "queryKey" | "queryFn">,
) {
  return useQuery<TItem, Error, TData>({
    queryKey: ITEM_QUERY.itemDetail(id),
    queryFn: () => getItemDetail(id),
    staleTime: 5 * 1000,
    ...options,
  });
}

export const useGetItems = (args: ItemFilters = {}) => {
  return useQuery({
    queryKey: ITEM_QUERY.itemWithFilter(args),
    queryFn: () => getAllItems(args),
    staleTime: 5 * 1000,
    placeholderData: (previousData) => previousData,
  });
};

export async function putItem({
  id,
  body,
}: {
  id: string;
  body: Partial<TItem>;
}) {
  try {
    // const response = await fetch(`${BASE_URL}/items/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(body),
    // });

    // return response.json();
    return new Promise((resolve) => {
      console.log(id);
      setTimeout(() => {
        resolve(body);
      }, 1000);
    });
  } catch (error) {
    console.log(error);
  }
}

type TputItemMutation = {
  id: string;
  body: Partial<TItem>;
};

export function usePutItemMutation(
  args?: UseMutationOptions<TputItemMutation, Error, TputItemMutation>,
) {
  return useMutation<TputItemMutation, Error, TputItemMutation>({
    mutationFn: ({ id, body }) =>
      putItem({ id, body }) as Promise<TputItemMutation>,
    ...args,
  });
}
