import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = 
    pathname.startsWith("/profile") || 
    (pathname.startsWith("/courses/") && pathname !== "/courses");

  if (isProtectedRoute) {
    // Use BetterAuth's built-in session check (handles cookies and CORS automatically)
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/courses/:id+"],
};
