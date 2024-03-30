"use server";

import { db } from "@/server/db";

interface urlFromServerResult {
  error: boolean;
  message: string;
  url?: string;
}

export const urlFromServer = async (
  slug: string,
): Promise<urlFromServerResult> => {
  try {
    const getLinkFromServer = await db.links.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!getLinkFromServer) {
      return {
        error: true,
        message: "🚧 Error (urlFromServer): Slug not found or invalid.",
      };
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

    return {
      error: false,
      message: "Success",
      url: getLinkFromServer.url,
    };
  } catch (error) {
    console.error("🚧 Error (urlFromServer): ", error);
    return {
      error: true,
      message: "Something went wrong.",
    };
  }
};
