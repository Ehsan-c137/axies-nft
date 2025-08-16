import { logger } from "@/utils/logger";
import type { TBlogDetail } from "@/types/service";
import { ToPagination } from "@/utils/toPagination";

const BLOGS_URL =
  "https://raw.githubusercontent.com/Ehsan-c137/axies-nft/main/src/mocks/blogs.json";

export async function getAllBlogs(
  options: { page?: number; limit?: number } = {},
) {
  try {
    const response = await fetch(BLOGS_URL);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch blogs: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    if (options?.page && options?.limit) {
      const paginatedData = ToPagination({
        page: options.page,
        limit: options.limit,
        data: data,
      });
      return paginatedData;
    }
    return data;
  } catch (error) {
    logger.error("Failed to fetch blogs:", error);
    throw error;
  }
}

export async function getBlogDetail(slug: string): Promise<TBlogDetail> {
  const blogs = await getAllBlogs();
  const blog = blogs.find((b: { slug: string }) => b.slug === slug);

  if (!blog) {
    throw new Error(`Blog with slug "${slug}" not found.`);
  }
  return blog;
}
