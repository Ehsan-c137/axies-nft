import { logger } from "@/utils/logger";
import { BASE_URL } from "../config";
import { TBlogDetail } from "@/types/service";

export async function getBlogDetail(slug: string): Promise<TBlogDetail | null> {
  try {
    const response = await fetch(`${BASE_URL}/blog/detail/${slug}`);
    return response.json();
  } catch (error) {
    logger.log(error);
    return null;
  }
}

export async function getAllBlogs(params?: { page?: number; limit?: number }) {
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
      return null;
    }

    return response.json();
  } catch (error) {
    logger.error("Error fetching blog posts:", error);
    return null;
  }
}
