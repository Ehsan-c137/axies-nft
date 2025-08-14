import { blogPosts } from "@/mocks/data";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  if (!page && !limit) return NextResponse.json(blogPosts);

  if (page || limit) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")!, 10) || 1;
    const limit = parseInt(url.searchParams.get("limit")!, 10) || 10;

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return NextResponse.json(
        {
          error:
            "Invalid page or limit parameter. They must be positive numbers.",
        },
        { status: 400 },
      );
    }

    const totalPosts = blogPosts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const posts = blogPosts.slice(startIndex, endIndex);

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

    if (posts.length === 0) {
      return NextResponse.json({ error: "No blogs found" }, { status: 404 });
    }

    return NextResponse.json(responseBody);
  }

  return NextResponse.json(blogPosts);
}
