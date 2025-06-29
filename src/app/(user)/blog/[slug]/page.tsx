import BlogDetailScreen from "@/screens/blog/blog-detail/blog-detail-screen";

type Props = {
  params: Promise<{ slug: string }>;
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const id = params.id;
//   const post = await fetch(`https://api.example.com/blog/${slug}`).then(
//     (res) => res.json(),
//   );

//   return {
//     title: post.name,
//     description: post.description,
//   };
// }

// export async function generateStaticParams() {
//   const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
//     (res) => res.json(),
//   );

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

export default async function Page({ params }: Props) {
  const slug = (await params).slug;

  return <BlogDetailScreen slug={slug} />;
}
