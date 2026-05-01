import { NextResponse } from "next/server";

export default async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const isProtectedRoute = 
    pathname.startsWith("/profile") || 
    (pathname.startsWith("/courses/") && pathname !== "/courses");

  if (isProtectedRoute) {
    // Check for session cookie
    const sessionCookie = request.cookies.get("better-auth.session_token") || 
                         request.cookies.get("__secure-better-auth.session_token");

    if (!sessionCookie) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, request.url));
    }

    // Optional: Verify session with API
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      });

      if (!response.ok) {
        return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, request.url));
      }

      const session = await response.json();
      if (!session) {
        return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, request.url));
      }
    } catch (error) {
      // If API check fails, we might want to allow or block. 
      // For safety, if we have the cookie, we can let it pass and let the client-side handle it if it's invalid.
      console.error("Middleware session check failed:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/courses/:id+"],
};
