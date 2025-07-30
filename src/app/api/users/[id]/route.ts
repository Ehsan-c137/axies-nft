import { NextResponse } from "next/server";
import { allUsers } from "@/mocks/data";

export async function GET(request: Request, params: Promise<{ id: string }>) {
  const id = (await params)?.id;
  const user = allUsers.find((user) => user.id === parseInt(id, 10));
  if (!user) {
    throw new Error("User not found");
  }
  return NextResponse.json(user);
}
