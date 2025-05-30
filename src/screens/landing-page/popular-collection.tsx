import PopularCollectionCard from "@/components/common/popular-collection-card";
import { Button } from "@ui/button";

export function PopularCollection() {
  return (
    <section className="container mx-auto flex flex-col gap-10 py-10 px-8">
      <div className="flex items-center justify-between">
        <h3 className="text-4xl font-bold">Popular Collection</h3>
        <Button variant="link" className="explore_more">
          EXPLORE MORE
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <PopularCollectionCard key={i} />
        ))}
      </div>
    </section>
  );
}
