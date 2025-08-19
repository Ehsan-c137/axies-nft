import { ILoginCredentials } from "@/types/service/auth";
import { MOCK_USER, MOCK_ACCESS_TOKEN, MOCK_REFRESH_TOKEN } from "@/mocks/data";
import { NextResponse } from "next/server";
import { REFRESH_TOKEN } from "@/services/config";

export async function POST(request: Request) {
  const isCI = process.env.CI === "true";
  const isProduction = process.env.APP_ENV === "production";

  try {
    const credentials: ILoginCredentials = await request.json();

    if (
      credentials.email === MOCK_USER.email &&
      credentials.password === "p@ssword123"
    ) {
      let sameSite: "strict" | "lax" | "none" = "strict";
      if (isCI) {
        sameSite = "none";
      } else if (!isProduction) {
        sameSite = "lax";
      }

      const response = NextResponse.json(
        {
          accessToken: MOCK_ACCESS_TOKEN,
          user: MOCK_USER,
        },
        { status: 200 },
      );

      response.cookies.set({
        name: REFRESH_TOKEN,
        value: MOCK_REFRESH_TOKEN,
        httpOnly: true,
        path: "/api/auth",
        domain: isCI ? "localhost" : undefined,
        secure: isProduction,
        sameSite: sameSite,
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
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
