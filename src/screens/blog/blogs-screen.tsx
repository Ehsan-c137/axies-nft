"use client";

import PaginationList from "@/components/common/pagination/pagination-list";
import { BlogCard } from "./blog-card";
import CardPlaceholder from "@/components/common/cards/card-placeholder";
import { useBlogPosts } from "@/services/blog/blog-service";
import { TPaginatedData } from "@/types/service";

interface IProps {
  blogs: any;
  currentPage: number;
}

export default function BlogScreen({ blogs, currentPage }: IProps) {
  const {
    data: blogPosts,
    isPending,
    error,
    isPlaceholderData,
  } = useBlogPosts(currentPage, {
    initialData: blogs,
  });

  return (
    <PaginationList
      error={error}
      isPending={isPending}
      paginatedData={blogPosts as TPaginatedData}
      DataCard={BlogCard}
      PlaceholderCard={CardPlaceholder}
      isPlaceholderData={isPlaceholderData}
      url={"blog"}
    />
  );
}
