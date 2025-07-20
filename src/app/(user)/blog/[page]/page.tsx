import BlogsScreen from "@/screens/blog/blogs-screen";
import { Metadata } from "next";
import { getBlogPosts } from "@/services/blog/blog-service";

interface IProps {
  params: { page: string };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const page = params.page ? ` - Page ${params.page}` : "";
  return {
    title: `Blogs${page}`,
    description: `Discover the latest articles on our blog, page ${params.page}.`,
  };
}

export async function generateStaticParams() {
  try {
    const blogs = await getBlogPosts();
    const totalPages = blogs.meta.lastPage || 1;
    const paths = Array.from({ length: totalPages }, (_, i) => ({
      page: (i + 1).toString(),
    }));

    return paths;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [{ page: "1" }];
  }
}

export default async function BlogsPage({ params }: IProps) {
  const pageNumber = parseInt(params.page, 10) || 1;
  const blogs = await getBlogPosts(pageNumber);

  return <BlogsScreen blogs={blogs} currentPage={pageNumber} />;
}
