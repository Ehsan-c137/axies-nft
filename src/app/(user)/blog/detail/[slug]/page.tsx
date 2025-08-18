import { Metadata } from "next";
import { getAllBlogs, getBlogDetail } from "@/services/server/blog";
import BlogDetailScreen from "@/screens/blog/blog-detail/blog-detail-screen";
import { logger } from "@/utils/logger";
import NotFoundContainer from "@/components/common/errors/not-found-component";
import { TBlogDetail } from "@/types/service";
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
    authors: blog.authorName ? [{ name: blog.authorName }] : [],
    description: blog.description?.slice(0, 160),
    openGraph: {
      title: blog.title,
      description: blog?.description,
      images: [
        {
          url: blog?.thumbnail,
          width: 600,
          height: 400,
        },
      ],
      type: "website",
    },
    twitter: {
      title: blog.title,
      description: blog?.description,
      images: {
        url: blog?.thumbnail,
        alt: blog.title,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export async function generateStaticParams() {
  try {
    const allBlogs = await getAllBlogs();
    return allBlogs.map((item: { slug: string }) => {
      return {
        slug: String(item.slug),
      };
    });
  } catch (error) {
    logger.error("error generateStaticParams", error);
    return [];
  }
}

export default async function Page({ params }: IProps) {
  const { slug } = await params;

  const blog: TBlogDetail | null = await getBlogDetail(slug);

  if (!blog) {
    return <NotFoundContainer />;
  }

  return <BlogDetailScreen blog={blog} />;
}
