import BlogsScreen from "@/screens/blog/blogs-screen";
import { Metadata } from "next";
import { TBlogDetail, TPaginatedData } from "@/types/service/index";
import { logger } from "@/utils/logger";
import { ToPagination } from "@/utils/toPagination";
import NotFound from "@/components/common/errors/not-found-component";
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
      description: `Discover the latest articles on our blog, page ${(await params).page}.`,
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
    const response = await fetch(
      "https://raw.githubusercontent.com/Ehsan-c137/axies-nft/main/src/mocks/blogs.json",
    );
    const allBlogs = await response.json();
    const blogs = ToPagination({
      data: allBlogs,
      limit: 8,
      page: 1,
    });
    const totalPages = blogs?.meta.lastPage || 1;
    const page = Array.from({ length: totalPages }, (_, i) => ({
      page: (i + 1).toString(),
    }));

    return page;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogsPage({ params }: IProps) {
  const pageParam = (await params).page;
  const pageNumber = parseInt(pageParam, 10) || 1;
  const blogs = await getAllBlogs({
    page: pageNumber,
  });

  if (!blogs) {
    return <NotFound />;
  }

  return (
    <BlogsScreen
      blogs={blogs as TPaginatedData<TBlogDetail>}
      currentPage={pageNumber}
    />
  );
}
