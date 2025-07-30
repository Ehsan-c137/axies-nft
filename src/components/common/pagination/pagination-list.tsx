"use client";
import React, { Suspense } from "react";
import PaginationControl from "./pagination-control";
import { TPaginatedData } from "@/types/service/index";
import { TItem } from "@/services/item/item-service";

interface IProps<T extends TItem> {
  DataCard: React.ComponentType<T>;
  PlaceholderCard: React.ComponentType;
  paginatedData: TPaginatedData<T>;
  isPlaceholderData?: boolean;
  isPending?: boolean;
  error: Error | null;
  url?: string;
}

export default function PaginationList<T extends TItem>({
  paginatedData,
  DataCard,
  PlaceholderCard,
  isPlaceholderData,
  isPending,
  error,
  url,
}: IProps<T>) {
  if (isPending && !isPlaceholderData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto">
        {Array.from({ length: 8 }).map((_, index) => (
          <PlaceholderCard key={index} />
        ))}
      </div>
    );
  }

  if (error?.message) {
    return <div className="w-full text-center">Error: {error.message}</div>;
  }

  if (paginatedData?.data?.length === 0) {
    return (
      <div className="w-full text-center">
        <p>Ooopes! could&apos;t not find anything</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center md:justify-items-start gap-6 container mx-auto transition-opacity"
        style={{
          opacity: isPlaceholderData ? 0.5 : 1,
        }}
      >
        {paginatedData?.data?.map((item, index) => {
          return (
            <Suspense key={index} fallback={<PlaceholderCard />}>
              <DataCard {...item} />
            </Suspense>
          );
        })}
      </div>

      <PaginationControl
        currentPage={paginatedData?.meta?.currentPage || 1}
        lastPage={paginatedData?.meta?.lastPage || 1}
        url={url}
      />
    </div>
  );
}
