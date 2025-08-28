import { NextResponse, NextRequest } from "next/server";
import { REFRESH_TOKEN } from "./services/config";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN);

  if (!refreshToken?.value) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
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
