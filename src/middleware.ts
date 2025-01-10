import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("__Secure-authjs.session-token");
  const pathname = request.nextUrl.pathname;

  // Define route handling logic
  const isAuthRoute = pathname.startsWith("/auth");
  const isBlogRoute = pathname.startsWith("/blog");

  if (isAuthRoute) {
    // If the user is authenticated, redirect to the home page
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (isBlogRoute) {
    // If the user is not authenticated, redirect to the sign-in page
    if (!token) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }
  // Allow the request to proceed if no conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/:path*", "/auth/:path*"],
};
