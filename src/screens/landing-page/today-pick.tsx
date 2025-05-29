import { Button } from "@ui/button";
import { LiveAuctionsCard } from "@/components/common/live-auctions-card-";
export function TodayPick() {
  return (
    <>
      <div className="flex flex-col gap-10 py-10">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold">Today's Pick</h3>
          <Button>EXPLORE MORE</Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline">Category</Button>
            <Button variant="outline">Category</Button>
            <Button variant="outline">Category</Button>
          </div>
          <Button variant="outline">SORT</Button>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
         gap-10"
        >
          <LiveAuctionsCard />
          <LiveAuctionsCard />
          <LiveAuctionsCard />
          <LiveAuctionsCard />
          <LiveAuctionsCard />
          <LiveAuctionsCard />
          <LiveAuctionsCard />
          <LiveAuctionsCard />
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
