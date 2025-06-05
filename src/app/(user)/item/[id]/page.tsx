import ItemDetailView from "@/screens/item-detail/screen";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ItemDetailView id={id} />;
}
