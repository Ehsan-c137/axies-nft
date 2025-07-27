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
        { message: "Item not found", error: true },
        { status: 404 },
      );
    }

    return Response.json(post);
  } catch (error) {
    console.log("Unexpected error:", error);
    return Response.json(
      { message: "Unexpected error", error: true },
      { status: 500 },
    );
  }
}
