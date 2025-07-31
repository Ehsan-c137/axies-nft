import type { Metadata } from "next";
import ItemDetailScreen from "@/screens/user/item-detail/item-screen";
import {
  getAllItems,
  getItemDetail,
  TItem,
} from "@/services/item/item-service";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getItemDetail(id);
  34;
  if (!item) {
    throw new Error("item not found");
  }

  return {
    title: item.name,
    description: item.description,
  };
}

export async function generateStaticParams() {
  try {
    const items: TItem[] = await getAllItems();
    return items.map((item) => ({
      id: String(item.id),
    }));
  } catch (error) {
    console.error("Error generating static param:", error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await getItemDetail(id);

  return <ItemDetailScreen id={id} initialData={item} />;
}
