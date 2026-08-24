import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { utilsJwt } from "./utiles/jwt";

const AUTH_ROUTES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;

  let userRole: string | null = null;

  if (accessToken) {
    const decodedAccessToken = utilsJwt.verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY as string
    );

    if (decodedAccessToken.success && decodedAccessToken.data) {
      userRole = (decodedAccessToken.data as JwtPayload).role as string;
    }
  }

  // Logged in user login/register এ গেলে dashboard এ যাবে
  if (accessToken && AUTH_ROUTES.includes(pathName)) {
    if (userRole === "ADMIN") {
      return NextResponse.redirect(
        new URL("/admin-dashboard", request.url)
      );
    }

    if (userRole === "PROVIDER") {
      return NextResponse.redirect(
        new URL("/provider-dashboard", request.url)
      );
    }

    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(
        new URL("/dashboard/customer", request.url)
      );
    }
  }

  // Dashboard protected
 // Protected routes
  const isProtectedRoute =
    pathName.startsWith("/admin-dashboard") ||
    pathName.startsWith("/provider-dashboard") ||
    pathName.startsWith("/dashboard/customer");

  // Login না করলে protected route এ যেতে পারবে না
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirectTo", pathName);

    return NextResponse.redirect(loginUrl);
  }


  // Admin authorization
  if (
    pathName.startsWith("/admin-dashboard") &&
    userRole !== "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/not-found", request.url)
    );
  }

  // Provider authorization
  if (
    pathName.startsWith("/provider-dashboard") &&
    userRole !== "PROVIDER"
  ) {
    return NextResponse.redirect(
      new URL("/not-found", request.url)
    );
  }

  // Customer authorization
  if (
    pathName.startsWith("/dashboard/customer") &&
    userRole !== "CUSTOMER"
  ) {
    return NextResponse.redirect(
      new URL("/not-found", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};