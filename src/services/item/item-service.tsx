import { useQuery, useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { allProducts } from "@/mocks/data";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";

interface ItemFilters {
  page?: number;
  limit?: number;
  category?: string[];
  chain?: string[];
  collection?: string[];
}

export type TItem = (typeof allProducts)[0];

export const ITEM_QUERY = {
  items: () => ["items"],
  itemWithFilter: (filters: ItemFilters) => [...ITEM_QUERY.items(), filters],
  itemDetail: (id: string) => ({
    queryKey: [...ITEM_QUERY.items(), id],
    queryFn: () => getItemDetail(id),
    staleTime: 5 * 1000,
  }),
};

export const getItemDetail = async (id: string) => {
  const response = await fetch(`${BASE_URL}/items/${id}`);
  return response.json();
};

export const getAllItems = async (args: ItemFilters = {}) => {
  const { page, limit, category, chain, collection } = args;
  console.log("get-all-item", limit);
  const params = new URLSearchParams();
  if (page) params.append("page", String(page));
  if (limit) params.append("limit", String(limit));
  if (category?.length) params.append("category", category.join(","));
  if (chain?.length) params.append("chain", chain.join(","));
  if (collection?.length) params.append("collection", collection.join(","));
  console.log("item-service", page);
  if (page !== undefined && limit !== undefined) {
    const response = await fetch(`${BASE_URL}/items?${params.toString()}`);
    return response.json();
  }

  const response = await fetch(`${BASE_URL}/items`);
  return response.json();
};

export function useGetItemDetail<TData = TItem, Error = any>(
  id: string,
  options?: Omit<UseQueryOptions<TItem, Error, TData>, "queryKey" | "queryFn">,
) {
  return useQuery<TItem, Error, TData>({
    ...ITEM_QUERY.itemDetail(id),
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

export async function putItem({ id, body }: { id: string; body: any }) {
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
      setTimeout(() => {
        resolve(body);
      }, 1000);
    });
  } catch (error) {
    console.log(error);
  }
}

export function usePutItemMutation(
  args?: UseMutationOptions<any, Error, { id: string; body: Partial<TItem> }>,
) {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) =>
      putItem({ id, body }),
    ...args,
  });
}
