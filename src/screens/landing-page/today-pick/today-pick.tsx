import { Button } from "@ui/button";
import { LiveAuctionsCard } from "@/components/common/cards/live-auctions-card";
import Filter from "./filter";

interface IProps {
  ref: React.RefObject<HTMLElement[]>;
}

export function TodayPick({ ref }: IProps) {
  return (
    <>
      <div
        className="flex flex-col gap-10 py-10 opacity-0"
        ref={(el) => {
          if (el) {
            ref.current[4] = el;
          }
        }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl lg:text-3xl font-bold">Today&apos;s Pick</h3>
          <Button variant="link" className="explore_more text-sm lg:text-xl">
            EXPLORE MORE
          </Button>
        </div>
        <Filter />
        <div
          className="grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
         gap-10"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <LiveAuctionsCard key={i} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline" className="px-4 py-2">
            Load More
          </Button>
        </div>
      </div>
    </>
  );
}
