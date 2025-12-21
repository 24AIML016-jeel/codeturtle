import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  // Skip middleware for public routes
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname === '/login' ||
    pathname === '/register'
  ) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login, register (auth pages)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login|register).*)",
  ],
};