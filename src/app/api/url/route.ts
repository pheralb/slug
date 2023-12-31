import type { NextRequest } from "next/server";
import type { link } from "@prisma/client";

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

  // Get data from query:
  const data = (await db.link.findFirst({
    where: {
      slug: {
        equals: params,
      },
    },
  })) as link;

  // Return (/) if not found (404):
  if (!data) {
    return NextResponse.json(
      { error: "Error: Slug not found or invalid." },
      { status: 404 },
    );
  }

  // Cache:
  newHeaders.set("cache-control", "public, max-age=31536000, immutable");

  return NextResponse.json(data, {
    headers: newHeaders,
  });
};
