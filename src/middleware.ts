import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
  DEFAULT_LOGIN_REDIRECT_URL,
  apiAuthPrefix,
  checkRoutesPrefix,
  authRoutes,
  protectedRoutes,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  try {
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
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl));
      }
      return;
    }

    // ⚙️ If Slug contains ``c``, redirect to /check/:slug:
    if (slugRoute && slugRoute.endsWith("&c")) {
      return Response.redirect(
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
      return Response.redirect(
        new URL(`/auth?callbackUrl=${encodedCallbackUrl}`, nextUrl),
      );
    }

    // ⚙️ Redirect using slug and fetch the URL:
    // If not public route and not protected route:
    if (!isPublicRoute && !isProtectedRoute && !isCheckRoute) {
      const data = await fetch(
        `${req.nextUrl.origin}/api/url?slug=${slugRoute}`,
      );

      if (data.status === 404) {
        return;
      }

      const dataToJson = await data.json();

      if (dataToJson.url) {
        return Response.redirect(new URL(dataToJson.url as string).toString());
      }
    }

    return;
  } catch (error) {
    console.error("🚧 Error in middleware:", error);
    return new Response("🛑 Internal Server Error", { status: 500 });
  }
});

export const config = {
  matcher: [
    "/((?!api/|_next/|images/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
    "/s/:slug*",
  ],
};
