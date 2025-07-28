import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";

export const BLOG_QUERY = {
  allBlogs: () => ["blog-posts"],
  blogDetail: (id: number) => ({
    queryKey: [...BLOG_QUERY.allBlogs(), id],
    queryFn: () => getBlogDetail(id),
    staleTime: 5 * 1000,
  }),
};

export async function getBlogPosts(page: number = 1, limit: number = 8) {
  try {
    const response = await fetch(
      `${BASE_URL}/blog?page=${page}&limit=${limit}`,
    );

    if (!response.ok) {
      console.log("something went wrong");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
}

export async function getAllblogPosts() {
  const response = await fetch(`${BASE_URL}/blog/all`);

  return response.json();
}

export async function getBlogDetail(id: number | string) {
  const response = await fetch(`${BASE_URL}/blog/detail/${id}`);
  return response.json();
}

export function useBlogPosts(page = 1, ...args: any) {
  return useQuery({
    queryKey: [...BLOG_QUERY.allBlogs(), page],
    queryFn: () => getBlogPosts(page),
    placeholderData: (previousData) => previousData,
    ...args,
  });
}

export function useBlogDetail(id: number, ...args: any) {
  return useQuery(BLOG_QUERY.blogDetail(id));
}
