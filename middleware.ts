import { NextResponse } from "next/server";

// Lightweight middleware: avoid importing heavy auth/prisma libs here (keeps edge bundle small).
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

  // Minimal check: look for common session/auth cookies or Authorization header.
  // This avoids pulling heavy authentication libraries into the Edge bundle.
  const cookieHeader = request.headers.get('cookie') || '';
  const authHeader = request.headers.get('authorization') || '';

  const hasSessionCookie = /next-auth\.session-token|sessionToken|session|sb|better_auth/i.test(cookieHeader);
  const hasAuthHeader = /^Bearer\s+\S+/i.test(authHeader);

  if (!hasSessionCookie && !hasAuthHeader) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow; detailed verification should happen in API/Server routes that run in Node env.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|register).*)",
  ],
};