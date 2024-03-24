import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
  DEFAULT_LOGIN_REDIRECT_URL,
  apiAuthPrefix,
  authRoutes,
  checkRoutesPrefix,
  dashboardRoutesPrefix,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  try {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isDashboardRoute = nextUrl.pathname.startsWith(dashboardRoutesPrefix);
    const isCheckRoute = nextUrl.pathname.startsWith(checkRoutesPrefix);
    const slugRoute = req.nextUrl.pathname.split("/").pop();

    // Is Api Route:
    if (isApiAuthRoute) {
      return;
    }

    // Is Auth Route. First, check is authenticated:
    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl));
      }
      return;
    }

    // If Slug contains ``c``, redirect to /check/:slug:
    if (slugRoute && slugRoute.endsWith("&c")) {
      return Response.redirect(
        new URL(`/check/${slugRoute.replace("&c", "")}`, nextUrl),
      );
    }

    // Check ``slug`` route.
    if (
      !isDashboardRoute &&
      !isAuthRoute &&
      !isApiAuthRoute &&
      !isPublicRoute &&
      !isCheckRoute
    ) {
      const data = await fetch(
        `${req.nextUrl.origin}/api/url?slug=${slugRoute}`,
      );

      if (data.status === 404) {
        console.log(`Slug not found: ${slugRoute}`);
        return;
      }

      const dataToJson = await data.json();

      if (dataToJson.url) {
        return Response.redirect(new URL(dataToJson.url as string).toString());
      }
    }

    // Protected routes:
    if (!isLoggedIn && !isPublicRoute) {
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      return Response.redirect(
        new URL(`/auth?callbackUrl=${encodedCallbackUrl}`, nextUrl),
      );
    }

    return;
  } catch (error) {
    console.error("Error in middleware:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});

export const config = {
  matcher: [
    "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
    "/s/:slug*",
  ],
};
