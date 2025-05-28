import PopularCollectionCard from "@/components/common/popular-collection-card";
import { Button } from "@ui/button";

export default function PopularCollection() {
  return (
    <section className="container mx-auto flex flex-col gap-10 py-10 px-8">
      <div className="flex items-center justify-between">
        <h3 className="text-4xl font-bold">Popular Collection</h3>
        <Button variant="link">EXPLORE MORE</Button>
      </div>
      <div className="flex items-center gap-10">
        <PopularCollectionCard />
        <PopularCollectionCard />
        <PopularCollectionCard />
      </div>
    </section>
  );
}
