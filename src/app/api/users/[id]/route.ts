import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const user = await getUserById(id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}
