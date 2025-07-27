import { blogPosts } from "@/mocks/data";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const postSlug = (await params)?.slug;
  const post = blogPosts.find((p) => p.slug === postSlug);

  if (!post) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}
