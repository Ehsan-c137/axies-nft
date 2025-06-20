import type { Metadata } from "next";
import ItemDetailScreen from "@/screens/user/item-detail/item-screen";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const id = params.id;
//   const item = await fetch(`https://api.example.com/items/${id}`).then(
//     (res) => res.json(),
//   );

//   return {
//     title: item.name,
//     description: item.description,
//   };
// }

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ItemDetailScreen id={id} />;
}
