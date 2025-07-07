"use client";

import FilterDesktop from "./filter-desktop";
import FilterMobile from "./filter-mobile";
import { ExploreCard } from "@/components/common/cards/explore-card";
import CardPlaceholder from "@/components/common/cards/card-placeholder";
import useSearchParamState from "@/hooks/useSearchParamState";
import { Button } from "@ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function ExploreScreen() {
  const {
    handleParamChange,
    optimisticParams: paramState,
    isPending: isFilterPending,
  } = useSearchParamState();

  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });

  return (
    <>
      <div className="flex flex-col md:flex-row gap-10 container mx-auto">
        {isDesktop && (
          <FilterDesktop
            handleParamChange={handleParamChange}
            paramState={paramState}
          />
        )}
        {!isDesktop && (
          <FilterMobile
            handleParamChange={handleParamChange}
            paramState={paramState}
          />
        )}

        <div className="flex flex-col  gap-10 w-full">
          <div className="flex flex-1 flex-wrap gap-4 justify-center justify-items-center md:justify-items-start md:justify-start">
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
