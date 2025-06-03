import { HEADER_HEIGHT } from "@/lib/constant/sizes";
import Breadcrumb from "@/components/common/breadcrumb";
import Filter from "@/screens/explore/filter";
import { ExploreCard } from "@/components/common/explore-card";

export default function Page() {
  return (
    <>
      <div
        className="relative w-full h-full bg-[url(/assets/img_bg_page_title_dark.webp)] "
        style={{ paddingTop: `${HEADER_HEIGHT + 32}px`, paddingBottom: "32px" }}
      >
        <div className="container mx-auto w-full flex flex-col gap-4 px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Explore</h1>
          <Breadcrumb />
        </div>
      </div>
      <div className="flex flex-col gap-10 py-8 container mx-auto px-4 md:px-6 lg:px-8">
        <Filter />
        <div className="flex flex-wrap gap-10">
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
        </div>
      </div>
    </>
  );
}
