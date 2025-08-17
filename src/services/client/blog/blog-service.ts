import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { BASE_URL } from "../../config";
import { logger } from "@/utils/logger";

export const BLOG_QUERY = {
  allBlogs: () => ["blog-posts"],
  blogDetail: (
    slug: string,
    options: Omit<UseQueryOptions, "queryKey" | "queryFn">,
  ) => ({
    queryKey: [...BLOG_QUERY.allBlogs(), slug],
    queryFn: () => getBlogDetail(slug),
    staleTime: 5 * 1000,
    ...options,
  }),
};

export async function getBlogPosts(params?: { page?: number; limit?: number }) {
  const url = new URL(`${BASE_URL}/blog`);
  if (params?.page) {
    url.searchParams.append("page", String(params.page));
  }
  if (params?.limit) {
    url.searchParams.append("limit", String(params.limit));
  }

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorInfo = {
        status: response.status,
        statusText: response.statusText,
      };
      logger.error("Failed to fetch blog posts", errorInfo);
      throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    logger.error("Error fetching blog posts:", error);
    throw error;
  }
}

export async function getBlogDetail(slug: string) {
  try {
    const response = await fetch(`${BASE_URL}/blog/detail/${slug}`);
    if (!response.ok) {
      const errorInfo = {
        status: response.status,
        statusText: response.statusText,
      };
      logger.error(`Failed to fetch blog detail for id: ${slug}`, errorInfo);
      throw new Error(`Failed to fetch blog detail: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    logger.error(`Error fetching blog detail for id: ${slug}`, error);
    throw error;
  }
}

export function useBlogPosts<TItem, TData = TItem>(
  page = 1,
  options?: Omit<
    UseQueryOptions<TItem, Error, TData>,
    "queryKey" | "queryFn" | "placeholderData"
  >,
) {
  return useQuery({
    queryKey: [...BLOG_QUERY.allBlogs(), page],
    queryFn: () => getBlogPosts({ page, limit: 8 }),
    placeholderData: (previousData) => previousData,
    ...options,
  });
}

export function useBlogDetail(slug: string, options: UseQueryOptions) {
  return useQuery(BLOG_QUERY.blogDetail(slug, options));
}
