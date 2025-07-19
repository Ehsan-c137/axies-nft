"use client";

import PaginationList from "@/components/common/pagination-list";
import { BlogCard } from "./blog-card";
import CardPlaceholder from "@/components/common/cards/card-placeholder";
import { useBlogPosts } from "@/services/blog/blog.service";

export default function BlogScreen() {
  const {
    data: blogPosts,
    isPending,
    error,
    isPlaceholderData,
  } = useBlogPosts();

  return (
    <PaginationList
      error={error}
      isPending={isPending}
      paginatedData={blogPosts}
      DataCard={BlogCard}
      PlaceholderCard={CardPlaceholder}
      isPlaceholderData={isPlaceholderData}
    />
  );
}
