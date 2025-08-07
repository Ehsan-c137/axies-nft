import { Metadata } from "next";
import { getBlogDetail, getAllblogPosts } from "@/services/blog/blog-service";
import BlogDetailScreen from "@/screens/blog/blog-detail/blog-detail-screen";
import { logger } from "@/lib/utils/logger";

interface IProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlogDetail(slug);

  if (!blog) {
    return {
      title: "Blog post not found",
    };
  }

  return {
    title: blog.title,
  };
}

export async function generateStaticParams() {
  try {
    const blogPosts = await getAllblogPosts();
    return blogPosts.map((post: { slug: string }) => ({
      slug: post.slug,
    }));
  } catch (erorr) {
    logger.error("Error generating static params:", erorr);
    return [];
  }
}

export default async function Page({ params }: IProps) {
  const { slug } = await params;
  const blog = await getBlogDetail(slug);
  return <BlogDetailScreen blog={blog} />;
}
