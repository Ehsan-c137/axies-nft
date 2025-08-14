export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const databseResponse = await fetch(
      "https://raw.githubusercontent.com/Ehsan-c137/axies-nft/main/src/mocks/items.json",
    );
    const database = await databseResponse.json();

    const postSlug = (await params)?.slug;
    const post = database.find((p: { slug: string }) => p.slug === postSlug);

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
    return Response.json({ message, error: true }, { status: 500 });
  }
}
