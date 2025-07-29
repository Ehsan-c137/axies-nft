import { Metadata } from "next";
import { getBlogDetail, getAllblogPosts } from "@/services/blog/blog-service";
import BlogDetailScreen from "@/screens/blog/blog-detail/blog-detail-screen";

interface IProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlogDetail(slug);
  console.log(blog);

  return {
    title: blog.title,
  };
}

export async function generateStaticParams() {
  const blogPosts = await getAllblogPosts();
  return blogPosts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: IProps) {
  const { slug } = await params;
  const blog = await getBlogDetail(slug);
  return <BlogDetailScreen blog={blog} />;
}
