import { NextResponse, NextRequest } from "next/server";
import { REFRESH_TOKEN } from "./services/config";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(REFRESH_TOKEN);

  if (!sessionCookie?.value) {
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
