import { allProducts } from "@/mocks/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const postSlug = (await params)?.slug;
    const post = allProducts.find((p) => p.slug === postSlug);

    if (!post) {
      return Response.json(
        { message: "Item not found", status: 404 },
        { status: 404 },
      );
    }

    return Response.json(post);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Unexpected error:", error);
    return Response.json(
      { message, error: true, status: 500 },
      { status: 500 },
    );
  }
}
