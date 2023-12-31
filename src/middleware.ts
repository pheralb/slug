import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

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

  console.log(dataToJson)

  if (data?.url) {
    return NextResponse.redirect(new URL(dataToJson.url as string).toString());
  }
}

export const config = {
  matcher: "/s/:slug*",
};
