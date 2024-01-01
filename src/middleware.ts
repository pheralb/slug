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

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return null;

  // // Get pathname:
  // const slug = req.nextUrl.pathname.split("/").pop();

  // // Get data from query:
  // const data = await fetch(`${req.nextUrl.origin}/api/url/${slug}`);

  // // Return (/) if not found (404):
  // if (data.status === 404) {
  //   return NextResponse.redirect(req.nextUrl.origin);
  // }

  // // Convert data to JSON:
  // const dataToJson = await data.json();

  // console.log(dataToJson);

  // if (data?.url) {
  //   return NextResponse.redirect(new URL(dataToJson.url as string).toString());
  // }
};

export default auth((req) => middleware(req, !!req.auth));

export const config = {
  matcher: [
    "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
    "/",
    "/:slug",
    "/(api|trpc)(.*)",
  ],
};
