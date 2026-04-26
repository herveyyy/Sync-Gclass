import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/classroom", "/onboarding"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected) {
    const session = await auth();

    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const isOnboarded = (session as any)?.is_onboarded;
    if (!isOnboarded && pathname !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
    if (isOnboarded && pathname === "/onboarding") {
      return NextResponse.redirect(new URL("/classroom", request.url));
    }
  }

  if (pathname === "/" || pathname === "/login") {
    const session = await auth();
    if (session) {
      const isOnboarded = (session as any)?.is_onboarded;
      if (!isOnboarded) {
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }
      return NextResponse.redirect(new URL("/classroom", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
