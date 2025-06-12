"use client";

import { HEADER_HEIGHT } from "@/lib/constant/sizes";
import Breadcrumb from "@/components/common/breadcrumb";
import Filter from "./filter";
import { ExploreCard } from "@/components/common/cards/explore-card";
import CardPlaceholder from "@/components/common/cards/card-placeholder";
import useSearchParamState from "@/hooks/useSearchParamState";
import { Button } from "@ui/button";

export default function ExploreScreen() {
  const {
    handleParamChange,
    optimisticParams: paramState,
    isPending: isFilterPending,
  } = useSearchParamState();
  return (
    <>
      <div className="flex flex-col md:flex-row gap-20 py-8 container mx-auto px-4 md:px-6 lg:px-8">
        <Filter handleParamChange={handleParamChange} paramState={paramState} />
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-1 flex-wrap gap-10">
            {isFilterPending && <CardPlaceholder />}
            <ExploreCard />
            <ExploreCard />
            <ExploreCard />
          </div>
          <div className="w-full text-center">
            <Button variant="outline">Load more</Button>
          </div>
        </div>
      </div>
    </>
  );
}
