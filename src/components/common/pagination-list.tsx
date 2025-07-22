"use client";
import React, { Suspense } from "react";
import PaginationControl from "./pagination-control";

interface IProps {
  paginatedData?: {
    data: { id: number; [key: string]: any }[];
    meta: {
      total: number;
      currentPage: number;
      lastPage: number;
      perPage: number;
      prev: number | null;
      next: number | null;
    };
  };
  DataCard: React.JSXElementConstructor<any>;
  PlaceholderCard: React.JSXElementConstructor<any>;
  isPlaceholderData?: boolean;
  isPending?: boolean;
  isError?: boolean;
  error: any;
}

export default function PaginationList({
  paginatedData,
  DataCard,
  PlaceholderCard,
  isPlaceholderData,
  isPending,
  isError,
  error,
}: IProps) {
  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto">
        {Array.from({ length: 4 }).map((_, index) => (
          <PlaceholderCard key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="w-full text-center">Error: {error.message}</div>;
  }

  if (paginatedData?.data.length === 0) {
    return (
      <div className="w-full text-center">
        Ooopes! could't not find anything
      </div>
    );
  }

  const { meta } = paginatedData!;
  const { currentPage, lastPage } = meta;

  return (
    <div className="flex flex-col gap-8">
      <div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto"
        style={{
          opacity: isPlaceholderData ? 0.5 : 1,
        }}
      >
        {paginatedData?.data?.map((item) => (
          <Suspense fallback={<PlaceholderCard key={item.id} />}>
            <DataCard key={item.id} {...item} />
          </Suspense>
        ))}
      </div>

      <PaginationControl currentPage={currentPage} lastPage={lastPage} />
    </div>
  );
}
