import type { Metadata } from "next";
import ItemDetailScreen from "@/screens/user/item-detail/item-screen";
import {
  getAllItems,
  getItemDetail,
  TItem,
} from "@/services/item/item-service";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getItemDetail(id);

  if (!item) {
    throw new Error("item not found");
  }

  return {
    title: item.name,
    description: item.description,
  };
}

export async function generateStaticParams() {
  const items: TItem[] = await getAllItems();

  return items.map((item) => ({
    id: String(item.id),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await getItemDetail(id);

  if (!item) {
    throw new Error("Item not found");
  }

  return <ItemDetailScreen id={id} initialData={item} />;
}
