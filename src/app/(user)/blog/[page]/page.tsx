import BlogsScreen from "@/screens/blog/blogs-screen";
import { Metadata } from "next";
import { getBlogPosts } from "@/services/blog/blog-service";

interface IProps {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const title = (await params).page ? ` - Page ${(await params).page}` : "";
  return {
    title: `Blogs${title}`,
    description: `Discover the latest articles on our blog, page ${(await params).page}.`,
  };
}

export async function generateStaticParams() {
  try {
    const blogs = await getBlogPosts();
    const totalPages = blogs?.meta.lastPage || 1;
    const page = Array.from({ length: totalPages }, (_, i) => ({
      page: (i + 1).toString(),
    }));

    return page;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error("Failed to generate static params for blogs");
  }
}

export default async function BlogsPage({ params }: IProps) {
  const pageParam = (await params).page;
  const pageNumber = parseInt(pageParam, 10) || 1;
  const blogs = await getBlogPosts(pageNumber);

  return <BlogsScreen blogs={blogs} currentPage={pageNumber} />;
}
