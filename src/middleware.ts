import { NextResponse, NextRequest } from "next/server";
import { ACCESS_TOKEN } from "./services/config";

export function middleware(request: NextRequest) {
  const session = request.cookies.get(ACCESS_TOKEN);

  if (!session) {
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
