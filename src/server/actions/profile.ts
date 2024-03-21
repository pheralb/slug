"use server";

import type { z } from "zod";
import type { UpdateProfileSchema } from "@/server/schemas";

import { auth } from "@/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

/**
 * Update Profile.
 * Authentication required.
 * @type {z.infer<typeof LinkSchema>}
 */
export const updateProfile = async (
  values: z.infer<typeof UpdateProfileSchema>,
) => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  // Create new link:
  const result = await db.user.update({
    where: {
      id: currentUser.user.id,
    },
    data: {
      ...values,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/settings");

  return result;
};
