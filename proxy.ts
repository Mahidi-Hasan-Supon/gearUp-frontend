import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { utilsJwt } from "./utiles/jwt";
import { getNewAccessToken } from "./service/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? utilsJwt.verifyToken(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY as string
      )
    : null;

  const decodedRefreshToken = refreshToken
    ? utilsJwt.verifyToken(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY as string
      )
    : null;

  // Access token expired/invalid হলে refresh token দিয়ে
  // নতুন access token নেওয়া হবে
  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;

      accessToken = newAccessToken;

      decodedAccessToken = utilsJwt.verifyToken(
        newAccessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY as string
      );
    }
  }

  let userRole: string | null = null;

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role as string;
  }

  // Logged-in user login/register এ গেলে role অনুযায়ী dashboard
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

  // Protected routes
  const isProtectedRoute =
    pathName.startsWith("/admin-dashboard") ||
    pathName.startsWith("/provider-dashboard") ||
    pathName.startsWith("/dashboard/customer");

  // Login করা না থাকলে protected route এ যেতে পারবে না
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirectTo", pathName);

    return NextResponse.redirect(loginUrl);
  }

  // Access token invalid এবং refresh করাও সম্ভব হয়নি
  if (isProtectedRoute && !userRole) {
    const response = NextResponse.redirect(
      new URL("/login", request.url)
    );

    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  }

  // ADMIN authorization
  if (
    pathName.startsWith("/admin-dashboard") &&
    userRole !== "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/not-found", request.url)
    );
  }

  // PROVIDER authorization
  if (
    pathName.startsWith("/provider-dashboard") &&
    userRole !== "PROVIDER"
  ) {
    return NextResponse.redirect(
      new URL("/not-found", request.url)
    );
  }

  // CUSTOMER authorization
  if (
    pathName.startsWith("/dashboard/customer") &&
    userRole !== "CUSTOMER"
  ) {
    return NextResponse.redirect(
      new URL("/not-found", request.url)
    );
  }

  // New access token browser cookie-তে update
  const response = NextResponse.next();

  if (
    decodedAccessToken?.success &&
    accessToken &&
    accessToken !== request.cookies.get("accessToken")?.value
  ) {
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};