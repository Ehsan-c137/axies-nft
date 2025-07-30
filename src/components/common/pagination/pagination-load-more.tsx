import { Button } from "@ui/button";
import clsx from "clsx";
import { Spinner } from "@/components/ui/spinner";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import CardPlaceholder from "../cards/card-placeholder";

interface IProps<T extends { id: React.Key }> {
  isPending: boolean;
  handleLoadMore: () => void;
  isPlaceholderData: boolean;
  lastPage: number;
  currentPage: number;
  error: Error | null;
  isError: boolean;
  data: T[];
  DataCard: React.ComponentType<T>;
}

export function PaginationLoadMore<T extends { id: React.Key }>({
  isPending,
  handleLoadMore,
  data,
  DataCard,
  isPlaceholderData,
  lastPage,
  currentPage,
  error,
  isError,
}: IProps<T>) {
  const gridRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (gridRef.current) {
      const newHeight = gridRef.current.scrollHeight;
      const oldHeight = heightRef.current;

      if (oldHeight !== null && newHeight > oldHeight) {
        gsap.fromTo(
          gridRef.current,
          { height: oldHeight },
          {
            height: newHeight,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              if (gridRef.current) {
                gsap.set(gridRef.current, { height: "auto" });
              }
            },
          },
        );
      }
      heightRef.current = newHeight;
    }
  }, [data]);

  if (isPending || data.length === 0) {
    return Array.from({ length: 8 }).map((_, index) => {
      return <CardPlaceholder key={index} />;
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div
        ref={gridRef}
        className={clsx(
          "grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 transition-opacity",
          {
            "opacity-50": isPlaceholderData,
          },
        )}
      >
        {data.map((item) => {
          return <DataCard key={item.id} {...item} />;
        })}
      </div>
      {isError && <div className="w-full text-center">{error?.message}</div>}
      {currentPage < lastPage && (
        <div className="w-full flex justify-center">
          <Button
            variant="outline"
            aria-disabled={isPending}
            disabled={isPending}
            onClick={handleLoadMore}
          >
            {isPending ? <Spinner /> : isError ? "Retry" : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}
