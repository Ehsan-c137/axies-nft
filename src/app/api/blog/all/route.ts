import { NextResponse } from "next/server";
import { blogPosts } from "@/mocks/data";

export async function GET() {
  const blogs = blogPosts;

  if (!blogs) {
    return NextResponse.json({ error: "No blogs found" }, { status: 404 });
  }

  return NextResponse.json(blogs);
}
