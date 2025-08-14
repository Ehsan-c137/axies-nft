import type { Metadata } from "next";
import ItemDetailScreen from "@/screens/user/item-detail/item-screen";
import { getItemDetail } from "@/services/item/item-service";
import NotFoundContainer from "@/components/common/errors/not-found-component";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItemDetail(slug);
  if (!item) {
    return {
      title: "Item not found",
    };
  }

  return {
    title: item.name,
    description: item.description,
  };
}

export async function generateStaticParams() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Ehsan-c137/axies-nft/main/src/mocks/blogs.json",
    );
    const allProducts = await response.json();
    return allProducts.map((item: { slug: string }) => {
      return {
        slug: String(item.slug),
      };
    });
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = await getItemDetail(slug);

  if (!item) {
    return <NotFoundContainer />;
  }

  return <ItemDetailScreen slug={slug} initialData={item} />;
}
