import { blogPosts } from "@/mocks/data";

export interface TPaginatedMeta {
  currentPage: number;
  lastPage: number;
  total?: number;
  perPage?: number;
}

export interface TPaginatedData<T> {
  data: T[];
  meta: TPaginatedMeta;
}

export type TBlogDetail = (typeof blogPosts)[0];
