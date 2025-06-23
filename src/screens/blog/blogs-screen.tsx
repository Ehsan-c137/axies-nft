import { BlogCard } from "./blog-card";

type Props = {
  slug: string;
};

export default function BlogScreen() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 py-10 container mx-auto">
      <BlogCard />
      <BlogCard />
    </section>
  );
}
