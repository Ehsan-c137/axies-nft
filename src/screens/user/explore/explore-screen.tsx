"use client";

import FilterDesktop from "./filter-desktop";
import FilterMobile from "./filter-mobile";
import { ExploreCard } from "@/components/common/cards/explore-card";
import CardPlaceholder from "@/components/common/cards/card-placeholder";
import useSearchParamState from "@/hooks/useSearchParamState";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { TItem, useGetItems } from "@/services/item/item-service";
import PaginationList from "@/components/common/pagination/pagination-list";

export default function ExploreScreen() {
  const {
    handleParamChange,
    optimisticParams: paramState,
    isPending: isFilterPending,
  } = useSearchParamState();

  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });

  const {
    data,
    isPending: isDataPending,
    isPlaceholderData,
    error,
  } = useGetItems({
    page: Number(paramState.page) || 1,
    limit: Number(paramState.limit) || 12,
    category: paramState.category,
    chain: paramState.chains,
    collection: paramState.collections,
  });

  return (
    <>
      <div className="flex flex-col md:flex-row gap-10 container mx-auto">
        {isDesktop && (
          <FilterDesktop
            handleParamChange={handleParamChange}
            paramState={paramState}
            isPending={isDataPending}
          />
        )}
        {!isDesktop && (
          <FilterMobile
            isDataPending={isDataPending}
            handleParamChange={handleParamChange}
            paramState={paramState}
          />
        )}

        <div className="flex flex-1 flex-wrap gap-4 justify-center justify-items-center md:justify-items-start md:justify-start">
          <PaginationList<TItem>
            paginatedData={data}
            DataCard={ExploreCard}
            PlaceholderCard={CardPlaceholder}
            isPending={isFilterPending || isDataPending}
            isPlaceholderData={isPlaceholderData}
            error={error}
          />
        </div>
      </div>
    </>
  );
}
