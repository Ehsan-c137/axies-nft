import { NextResponse } from "next/server";
import { MOCK_USER, MOCK_JWT } from "@/mocks/data";
import { cookies } from "next/headers";
import { COOKIE_KEY } from "@/services/config";

export async function GET() {
  const cookiesStore = await cookies();

  if (cookiesStore.get(COOKIE_KEY)?.value === MOCK_JWT) {
    return NextResponse.json(MOCK_USER, { status: 200 });
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
