import BlogsScreen from "@/screens/blog/blogs-screen";
import { Metadata } from "next";
import { logger } from "@/utils/logger";
import { getAllBlogs } from "@/services/server/blog";

interface IProps {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { page } = await params;
  try {
    const title = page ? ` - Page ${page}` : "";
    return {
      title: `Blogs${title}`,
      description: `Discover the latest articles on our blog, page ${page}.`,
    };
  } catch (error) {
    logger.error("error generating metadata ", error);
    return {
      title: "Blogs",
      description: "Discover the latest articles on our blog.",
    };
  }
}

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs({
      limit: 12,
      page: 1,
    });

    const lastPage = blogs?.meta?.lastPage || 0;

    if (lastPage === 0) {
      return [];
    }

    return Array.from({ length: lastPage }, (_, index) => ({
      page: (index + 1).toString(),
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogsPage({ params }: IProps) {
  const { page } = await params;
  const pageNumber = parseInt(page, 10) || 1;
  const blogs = await getAllBlogs({
    page: pageNumber,
    limit: 12,
  });

  if (!blogs) {
    console.log(blogs);
    throw new Error(
      `Failed to fetch blog data for page: ${pageNumber}. Check build logs for details on the data fetching error.`,
    );
  }

  return <BlogsScreen blogs={blogs} currentPage={pageNumber} />;
}
