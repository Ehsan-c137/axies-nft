import PopularCollectionCard from "@/components/common/cards/popular-collection-card";
import { Button } from "@ui/button";
interface Iprops {
  ref: React.RefObject<HTMLElement[]>;
}

export function PopularCollection({ ref }: Iprops) {
  return (
    <section
      className="container mx-auto flex flex-col gap-10 py-10 md:px-8 opacity-0"
      ref={(el) => {
        if (el) {
          ref.current[2] = el;
        }
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl lg:text-4xl font-bold">Popular Collection</h3>
        <Button variant="link" className="explore_more text-sm lg:text-xl">
          EXPLORE MORE
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <PopularCollectionCard key={i} />
        ))}
      </div>
    </section>
  );
}
