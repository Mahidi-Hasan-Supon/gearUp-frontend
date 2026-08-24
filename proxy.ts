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
      process.env.JWT_ACCESS_SECRET as string
    );

    if (decodedAccessToken.success && decodedAccessToken.data) {
      userRole = (decodedAccessToken.data as JwtPayload).role as string;
    }
  }

  // Logged in user login/register এ গেলে dashboard এ যাবে
  if (accessToken && AUTH_ROUTES.includes(pathName)) {
    if (userRole === "ADMIN") {
      return NextResponse.redirect(
        new URL("/dashboard/admin", request.url)
      );
    }

    if (userRole === "PROVIDER") {
      return NextResponse.redirect(
        new URL("/dashboard/provider", request.url)
      );
    }

    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(
        new URL("/dashboard/customer", request.url)
      );
    }
  }

  // Dashboard protected
  if (pathName.startsWith("/dashboard") && !accessToken) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirectTo", pathName);

    return NextResponse.redirect(loginUrl);
  }

  // Admin authorization
  if (
    pathName.startsWith("/dashboard/admin") &&
    userRole !== "ADMIN"
  ) {
    return NextResponse.redirect(
      new URL("/not-found", request.url)
    );
  }

  // Provider authorization
  if (
    pathName.startsWith("/dashboard/provider") &&
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