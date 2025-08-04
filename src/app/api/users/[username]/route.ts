import { allUsers } from "@/mocks/data";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;
  const user = allUsers.find((user) => user.username === username);

  if (!user) {
    return NextResponse.json({ message: "User not found", status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
