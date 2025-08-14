import type { Metadata } from "next";
import ItemDetailScreen from "@/screens/user/item-detail/item-screen";
import { getItemDetail } from "@/services/server/items";
import NotFoundContainer from "@/components/common/errors/not-found-component";
import { logger } from "@/utils/logger";
import { BASE_URL } from "@/services/config";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const response = await fetch(`${BASE_URL}/items/${slug}`);
    const item = await response.json();
    return {
      title: item.name,
      description: item.description,
    };
  } catch (error) {
    logger.log(error);
    return {
      title: "Item not found",
    };
  }
}

export async function generateStaticParams() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Ehsan-c137/axies-nft/main/src/mocks/items.json",
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

  if (item?.status == 404 || !item) {
    return <NotFoundContainer />;
  }

  return <ItemDetailScreen slug={slug} initialData={item} />;
}
