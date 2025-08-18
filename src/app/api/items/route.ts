import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Ehsan-c137/axies-nft/main/src/mocks/items.json",
    );
    const allProducts = await response.json();

    if (!page || !limit) {
      return NextResponse.json(allProducts);
    }

    const url = new URL(request.url);
    const pageNum = parseInt(url.searchParams.get("page") || "1", 10);
    const limitNum = parseInt(url.searchParams.get("limit") || "10", 10);

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
  } catch (error) {
    return NextResponse.json(
      {
        message: "something went wrong",
        error: error,
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
