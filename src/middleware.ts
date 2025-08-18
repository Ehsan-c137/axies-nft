import { NextResponse, NextRequest } from "next/server";
import { REFRESH_TOKEN } from "./services/config";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const sessionCookie = await cookies();
  const sessionRefreshToken = sessionCookie.get(REFRESH_TOKEN);

  if (!!sessionRefreshToken?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/wallet/:path*",
    "/item-creation/:path*",
    "/profile/edit-profile/:path*",
  ],
};
