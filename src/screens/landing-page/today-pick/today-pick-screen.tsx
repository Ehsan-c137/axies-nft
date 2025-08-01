"use client";

import { Button } from "@ui/button";
import { LiveAuctionsCard } from "@common/cards/live-auctions-card";
import { PaginationLoadMore } from "@common/pagination/pagination-load-more";
import Filter from "./today-pick-filter";
import { useGetTodayPick } from "@/services/item/today-pick";
import useSearchParamState from "@/hooks/useSearchParamState";
import { useEffect, useState } from "react";
import { TItem } from "@/services/item/item-service";

interface IProps {
  ref: React.RefObject<HTMLElement[]>;
}

const PARAM_KEYS = {
  page: "today_pick_page",
  limit: "today_pick_limit",
  category: "today_pick_category",
  collections: "today_pick_collections",
  sort: "today_pick_sort",
};

export function TodayPick({ ref }: IProps) {
  const [showedData, setShowedData] = useState<TItem[]>([]);

  const { handleParamChange, optimisticParams: paramState } =
    useSearchParamState();

  const { data, isPending, isPlaceholderData, error, isError } =
    useGetTodayPick({
      page: Number(paramState[PARAM_KEYS.page]) || 1,
      limit: Number(paramState[PARAM_KEYS.limit]) || 8,
      category: paramState[PARAM_KEYS.category],
      collection: paramState[PARAM_KEYS.collections],
      sort: paramState[PARAM_KEYS.sort]?.[0],
    });

  const currentPage = data?.meta?.currentPage;
  const lastPage = data?.meta?.lastPage;
  const dataArr = data?.data;

  const handleLoadMore = () => {
    handleParamChange(PARAM_KEYS.page, String(currentPage + 1), true, true);

    if (data?.meta && data.meta.currentPage < data.meta.lastpage) {
      setShowedData((prevData) => [...prevData, ...data?.data]);
    }
  };

  useEffect(() => {
    if (dataArr && !isPlaceholderData) {
      if (currentPage === 1) {
        setShowedData(dataArr);
      } else {
        setShowedData((prevData) => [...prevData, ...dataArr]);
      }
    }
  }, [lastPage, currentPage, dataArr, isPlaceholderData]);

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
        <Filter paramState={paramState} handleParamChange={handleParamChange} />
        <PaginationLoadMore
          data={showedData}
          DataCard={LiveAuctionsCard}
          isPending={isPending}
          handleLoadMore={handleLoadMore}
          isPlaceholderData={isPlaceholderData}
          lastPage={data?.meta?.lastPage || 1}
          currentPage={data?.meta?.currentPage || 1}
          error={error}
          isError={isError}
        />
      </div>
    </>
  );
}
