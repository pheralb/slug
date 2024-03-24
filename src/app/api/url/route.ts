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

  const data = await db.$transaction(async (tx) => {
    // 1. Check if the slug exists:
    const slugExists = await tx.links.findFirst({
      where: {
        slug: params,
      },
    });

    // 2. If not found, return null:
    if (!slugExists) {
      return null;
    }

    // 3. Update analytics:
    const browser = req.headers.get("user-agent");
    const ipAddress = req.headers.get("x-real-ip");


    await tx.links.update({
      where: {
        slug: params,
      },
      data: {
        clicks: {
          increment: 1,
        },
        lastClicked: new Date(),
      },
    });

    return slugExists;
  });

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
