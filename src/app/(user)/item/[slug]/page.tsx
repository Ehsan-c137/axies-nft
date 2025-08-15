import type { Metadata } from "next";
import ItemDetailScreen from "@/screens/user/item-detail/item-screen";
import { getItemDetail } from "@/services/server/items";
import NotFoundContainer from "@/components/common/errors/not-found-component";
import { logger } from "@/utils/logger";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const item = await getItemDetail(slug);
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
