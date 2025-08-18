import { NextResponse, NextRequest } from "next/server";
import { REFRESH_TOKEN } from "./services/config";

export function middleware(request: NextRequest) {
  const sessionRefreshToken = request.cookies.get(REFRESH_TOKEN);

  if (!sessionRefreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the refresh token exists, we can assume the user has an active session.
  // The client-side is responsible for managing the access token (fetching a new one if needed).
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/wallet/:path*",
    "/item-creation/:path*",
    "/profile/edit-profile/:path*",
  ],
};
