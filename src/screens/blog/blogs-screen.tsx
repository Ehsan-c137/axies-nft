"use client";

import PaginationList from "@/components/common/pagination/pagination-list";
import { BlogCard } from "./blog-card";
import CardPlaceholder from "@/components/common/cards/card-placeholder";
import { useBlogPosts } from "@/services/client/blog/blog-service";
import { TPaginatedData, TBlogDetail } from "@/types/service/index";

interface IProps<T> {
  blogs: TPaginatedData<T>;
  currentPage: number;
}

export default function BlogScreen<T>({ blogs, currentPage }: IProps<T>) {
  const {
    data: blogPosts,
    isPending,
    error,
    isPlaceholderData,
  } = useBlogPosts(
    {
      page: currentPage,
      limit: 12,
    },
    {
      initialData: blogs,
    },
  );

  return (
    <PaginationList<TBlogDetail>
      error={error}
      isPending={isPending}
      paginatedData={blogPosts as TPaginatedData<TBlogDetail>}
      DataCard={BlogCard}
      PlaceholderCard={CardPlaceholder}
      isPlaceholderData={isPlaceholderData}
      url={"blog"}
    />
  );
}
