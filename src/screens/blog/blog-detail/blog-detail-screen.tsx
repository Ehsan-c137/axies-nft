interface IProps {
  blog: any;
}

export default function BlogDetailScreen({ blog }: IProps) {
  return (
    <section className="container mx-auto px-4 py-10">
      <p>not implemented yet</p>
      <p className="text-gray-600 mb-4">{blog?.content}</p>
    </section>
  );
}
