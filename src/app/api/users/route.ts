import { NextResponse } from "next/server";
import { allUsers } from "@/mocks/data";

export async function GET() {
  const user = allUsers;

  return NextResponse.json(user);
}
