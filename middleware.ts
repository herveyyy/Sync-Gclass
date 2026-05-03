import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Routes that don't require authentication.
 * Everything else will redirect to /login if unauthenticated.
 */
const PUBLIC_ROUTES = ["/", "/login", "/pricing"];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Allow NextAuth API routes, static assets, and public routes
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/logos") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_ROUTES.includes(pathname)
  ) {
    return NextResponse.next();
  }

  if (!req.auth || !req.auth?.access_token) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  /*
   * Match everything except static files and images.
   * See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
   */
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
