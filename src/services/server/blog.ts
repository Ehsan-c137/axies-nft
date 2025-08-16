import { logger } from "@/utils/logger";
import type { TBlogDetail } from "@/types/service";

const BLOGS_URL =
  "https://raw.githubusercontent.com/Ehsan-c137/axies-nft/main/src/mocks/blogs.json";

export async function getAllBlogs(): Promise<TBlogDetail[]> {
  try {
    const response = await fetch(BLOGS_URL);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch blogs: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    logger.error("Failed to fetch blogs:", error);
    throw error;
  }
}

export async function getBlogDetail(slug: string): Promise<TBlogDetail> {
  const blogs = await getAllBlogs();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    throw new Error(`Blog with slug "${slug}" not found.`);
  }
  return blog;
}
