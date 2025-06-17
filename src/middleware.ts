import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { NextResponse } from "next/server";

import {
  DEFAULT_LOGIN_REDIRECT_URL,
  apiAuthPrefix,
  checkRoutesPrefix,
  authRoutes,
  protectedRoutes,
  publicRoutes,
} from "./routes";

import type { urlFromServerResult } from "./server/middleware/redirect";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isCheckRoute = nextUrl.pathname.startsWith(checkRoutesPrefix);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const slugRoute = req.nextUrl.pathname.split("/").pop();

  // ⚙️ Is Api Route:
  if (isApiAuthRoute) {
    return;
  }

  // ⚙️ Is Auth Route. First, check is authenticated:
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl),
      );
    }
    return;
  }

  // ⚙️ If Slug contains ``c``, redirect to /check/:slug:
  if (slugRoute?.endsWith("&c")) {
    return NextResponse.redirect(
      new URL(`/check/${slugRoute.replace("&c", "")}`, nextUrl),
    );
  }

  // ⚙️ Protected routes. If not authenticated, redirect to /auth:
  if (!isLoggedIn && isProtectedRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  // ⚙️ Redirect using slug:
  // If not public route and not protected route:
  if (!isPublicRoute && !isProtectedRoute && !isCheckRoute) {
    const apiUrl = new URL(`/api/url-redirect/${slugRoute}`, nextUrl);
    const res = await fetch(apiUrl);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: res.status });
    }
    const getDataApi = (await res.json()) as urlFromServerResult;

    if (getDataApi.redirect404) {
      console.log("🚧 Error - Redirect 404: ", slugRoute);
    }

    if (getDataApi.error) {
      return NextResponse.json({ error: getDataApi.message }, { status: 500 });
    }

    if (getDataApi.url) {
      return NextResponse.redirect(new URL(getDataApi.url).toString());
    }
  }
  return;
});

export const config = {
  matcher: [
    "/((?!api/|_next/|images/|docs/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
    "/s/:slug*",
  ],
};
