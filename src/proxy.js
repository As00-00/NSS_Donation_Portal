import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; 

export async function proxy(request) {
  const path = request.nextUrl.pathname;
  
  const isProtectedRoute = path.startsWith("/dashboard");
  const isAdminRoute = path.startsWith("/admin");

  const cookie = request.cookies.get("session_token");
  const token = cookie?.value;

  if ((isProtectedRoute || isAdminRoute) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (isAdminRoute && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      if (path === "/login" || path === "/register") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};