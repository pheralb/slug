import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/server/db";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const params = url.searchParams.get("slug");
  const newHeaders = new Headers(req.headers);

  // If no slug provided (500):
  if (!params || typeof params !== "string") {
    return NextResponse.json(
      { error: "🚧 Error: No slug provided." },
      { status: 500 },
    );
  }

  try {
    const getLinkFromServer = await db.links.findUnique({
      where: {
        slug: params,
      },
    });

    if (!getLinkFromServer) {
      return NextResponse.json(
        { error: "Error: Slug not found or invalid." },
        { status: 404 },
      );
    }

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

    newHeaders.set("cache-control", "public, max-age=31536000, immutable");

    return NextResponse.json(getLinkFromServer, {
      headers: newHeaders,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(`🚧 Error: ${error.message}`);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 },
    );
  }
};
