import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { db } from "@/server/db";

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams.get("slug");
  const newHeaders = new Headers(req.headers);

  // If no slug provided (500):
  if (!params || typeof params !== "string") {
    return NextResponse.json(
      { error: "Error: No slug provided." },
      { status: 500 },
    );
  }

  // Search for the slug in the database:
  const getLinkFromServer = await db.links.findUnique({
    where: {
      slug: params,
    },
  });

  // If no link found (404):
  if (!getLinkFromServer) {
    return NextResponse.json(
      { error: "Error: Slug not found or invalid." },
      { status: 404 },
    );
  }

  // Increment the clicks in the database:
  await db.links.update({
    where: {
      id: getLinkFromServer.id,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });

  // Cache:
  newHeaders.set("cache-control", "public, max-age=31536000, immutable");

  // Redirect to the URL:
  return NextResponse.redirect(new URL(getLinkFromServer.url).toString());
};
