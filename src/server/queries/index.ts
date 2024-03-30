import { cache } from "react";
import { auth } from "@/auth";
import { db } from "@/server/db";

/**
 * Get links with tags by user.
 * Authentication required.
 */
export const getLinksByUser = cache(async () => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  const result = await db.links.findMany({
    where: {
      creatorId: currentUser.user?.id,
    },
  });

  return {
    limit: currentUser.user?.limitLinks,
    links: result,
  };
});
