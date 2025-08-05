import type { Metadata } from "next";

import ItemDetailScreen from "@/screens/user/item-detail/item-screen";
import {
  getAllItems,
  getItemDetail,
  TItem,
} from "@/services/item/item-service";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getItemDetail(id);
  if (!item) {
    notFound();
  }

  return {
    title: item.name,
    description: item.description,
  };
}

export async function generateStaticParams() {
  try {
    const items = (await getAllItems()) as TItem[];

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

  if (!item) {
    notFound();
  }

  return <ItemDetailScreen id={id} initialData={item} />;
}
