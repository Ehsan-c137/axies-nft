export type TPaginatedData = {
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
