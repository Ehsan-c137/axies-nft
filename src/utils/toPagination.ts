interface IProps {
  page: number;
  limit: number;
  data: Record<string, unknown>[];
}

export function ToPagination({ page, limit, data }: IProps) {
  const totalPosts = data.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = data.slice(startIndex, endIndex);

  const responseBody = {
    data: posts,
    meta: {
      total: totalPosts,
      currentPage: page,
      lastPage: Math.ceil(totalPosts / limit),
      perPage: limit,
      prev: page > 1 ? page - 1 : null,
      next: endIndex < totalPosts ? page + 1 : null,
    },
  };

  return responseBody;
}
