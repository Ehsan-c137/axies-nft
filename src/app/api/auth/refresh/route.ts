import { MOCK_ACCESS_TOKEN, MOCK_REFRESH_TOKEN, MOCK_USER } from "@/mocks/data";
import { REFRESH_TOKEN } from "@/services/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_TOKEN);
    if (!refreshToken?.value) {
      return NextResponse.json(
        { message: "Authentication required. No refresh token found." },
        { status: 401 },
      );
    }

    if (refreshToken.value !== MOCK_REFRESH_TOKEN) {
      return NextResponse.json(
        { message: "Invalid refresh token." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      accessToken: MOCK_ACCESS_TOKEN,
      user: MOCK_USER,
    });
  } catch (error) {
    console.error("Refresh API error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
