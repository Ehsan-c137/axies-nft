import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@ui/pagination";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface IProps {
  currentPage: number;
  lastPage: number;
  url?: string;
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
const DOTS = "...";

export default function PaginationControl({
  currentPage,
  lastPage,
  url,
}: IProps) {
  const searchParams = useSearchParams();

  let activePage = currentPage;
  if (!url && searchParams?.has("page")) {
    activePage = Number(searchParams?.get("page"));
  }
  const paginationRange = useMemo(() => {
    const siblingCount = 1;
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= lastPage) {
      return range(1, lastPage);
    }

    const leftSiblingIndex = Math.max(activePage - siblingCount, 1);
    const rightSiblingIndex = Math.min(activePage + siblingCount, lastPage);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < lastPage - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, lastPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(lastPage - rightItemCount + 1, lastPage);
      return [1, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, DOTS, ...middleRange, DOTS, lastPage];
    }

    return range(1, lastPage);
  }, [activePage, lastPage]);

  if (lastPage <= 1) {
    return null;
  }

  return (
    <Suspense>
      {lastPage > 1 && (
        <div className="w-full text-center" data-testid="pagination-control">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  data-testid="pagination-previous-button"
                  href={
                    url
                      ? `/${url}/${activePage - 1}`
                      : `?page=${activePage - 1}`
                  }
                  aria-disabled={activePage === 1}
                  className={
                    activePage <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {paginationRange?.map((page, index) => {
                if (page === DOTS) {
                  return (
                    <PaginationItem key={`${page}-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href={url ? `/${url}/${page}` : `?page=${page}`}
                      isActive={page === activePage}
                      data-testid={`pagination-link-${page}`}
                      {...(page === activePage
                        ? {
                            "aria-current": "page",
                          }
                        : {})}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  data-testid="pagination-next-button"
                  href={
                    url
                      ? `/${url}/${activePage + 1}`
                      : `?page=${activePage + 1}`
                  }
                  aria-disabled={activePage >= lastPage}
                  className={
                    activePage >= lastPage
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </Suspense>
  );
}
