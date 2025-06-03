import ItemDetailView from "@/screens/item-detail/view";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ItemDetailView id={id} />;
}
