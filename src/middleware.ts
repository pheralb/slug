import type { NextRequest } from "next/server";

import NextAuth from "next-auth";
import authConfig from "auth.config";

// App Routes:
// Check src/routes.ts.
import {
  DEFAULT_LOGIN_REDIRECT_URL,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

// Auth Config:
const { auth } = NextAuth(authConfig);

const middleware = async (req: NextRequest, isLoggedIn: boolean) => {
  const { nextUrl } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const slugRoute = req.nextUrl.pathname.split("/").pop();

  // Is Api Route:
  if (isApiAuthRoute) {
    return null;
  }

  // Is Auth Route. First, check is authenticated:
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl));
    }
    return null;
  }

  // Protected routes:
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  // Now, check ``slug`` route.
  // If does not exist, redirect to main page.
  const data = await fetch(`${req.nextUrl.origin}/api/url?slug=${slugRoute}`);

  if (data.status === 404) {
    return Response.redirect(req.nextUrl.origin);
  }

  const dataToJson = await data.json();

  if (data?.url) {
    return Response.redirect(new URL(dataToJson.url as string).toString());
  }

  return null;
};

export default auth((req) => middleware(req, !!req.auth));

export const config = {
  matcher: [
    "/",
    "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
    "/s/:slug*",
  ],
};
