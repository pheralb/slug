import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

  // Get pathname:
  const slug = req.nextUrl.pathname.split("/").pop();

  // Get data from query:
  const data = await fetch(`${req.nextUrl.origin}/api/url/${slug}`);

  // Return (/) if not found (404):
  if (data.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  // Convert data to JSON:
  const dataToJson = await data.json();

  if (data?.url) {
    return NextResponse.redirect(new URL(dataToJson.url));
  }
}

export const config = {
  matcher: "/s/:slug*",
};
