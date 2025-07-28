export type TPaginatedData = {
  data: [];
  meta: {
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
};
