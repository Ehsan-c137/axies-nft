import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@ui/pagination";

interface IProps {
  currentPage: number;
  lastPage: number;
}

export default function PaginationControl({ currentPage, lastPage }: IProps) {
  return (
    <>
      {lastPage > 1 && (
        <div className="w-full text-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${currentPage - 1}`}
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage < 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: lastPage }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href={`?page=${page}`}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  href={`?page=${currentPage + 1}`}
                  aria-disabled={currentPage >= lastPage}
                  className={
                    currentPage >= lastPage
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
