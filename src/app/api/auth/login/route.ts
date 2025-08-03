import { ILoginCredentials } from "@/types/service/auth";
import { MOCK_USER, MOCK_JWT } from "@/mocks/data";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_KEY } from "@/services/config";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  try {
    const credentials: ILoginCredentials = await request.json();

    if (
      credentials.email === MOCK_USER.email &&
      credentials.password === "p@ssword123"
    ) {
      cookieStore.set({
        name: COOKIE_KEY,
        value: MOCK_JWT,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
      });

      return NextResponse.json(
        {
          user: MOCK_USER,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
