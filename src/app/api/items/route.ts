import { allProducts } from "@/mocks/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  if (page || limit) {
    const url = new URL(request.url);
    const pageNum = parseInt(url.searchParams.get("page")!);
    const limitNum = parseInt(url.searchParams.get("limit")!);

    console.log(pageNum, limitNum);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
      return NextResponse.json(
        {
          error:
            "Invalid page or limit parameter. They must be positive numbers.",
        },
        { status: 400 },
      );
    }

    const totalPosts = allProducts.length;
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const posts = allProducts.slice(startIndex, endIndex);

    const responseBody = {
      data: posts,
      meta: {
        total: totalPosts,
        currentPage: pageNum,
        lastPage: Math.ceil(totalPosts / limitNum),
        perPage: limit,
        prev: pageNum > 1 ? pageNum - 1 : null,
        next: endIndex < totalPosts ? pageNum + 1 : null,
      },
    };

    return NextResponse.json(responseBody);
  }

  return NextResponse.json(allProducts);
}
