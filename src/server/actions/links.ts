"use server";

import type { z } from "zod";
import type { CreateLinkSchema, LinkSchema } from "@/server/schemas";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { env } from "@/env.mjs";

/**
 * Get links created by user.
 * Authentication required.
 */
export const getLinksByUser = async () => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  const result = await db.link.findMany({
    where: {
      creatorId: currentUser.user?.id,
    },
  });

  return result;
};

/**
 * Get single link data.
 * Return an object.
 * Authentication required.
 * @type {number()}
 */
export const getSingleLink = async (id: number) => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  const result = await db.link.findUnique({
    where: {
      id,
    },
  });

  return result;
};

/**
 * Check if slug is available.
 * Return true or false.
 * Not authentication required.
 * @type {string()}
 */
export const checkIfSlugExist = async (slug: string) => {
  const result = await db.link.findUnique({
    where: {
      slug: slug,
    },
  });

  if (result) {
    return true;
  }

  return false;
};

/**
 * Check if user has exceeded the limit.
 */

export const checkLimit = async () => {
  const currentUser = await auth();
  const limit = Number(env.NEXT_PUBLIC_MAX_URLS_PER_USER);

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  const result = await db.link.count({
    where: {
      creatorId: currentUser.user?.id,
    },
  });

  if (result >= limit) {
    return true;
  }

  return false;
};

/**
 * Create new link.
 * Authentication required.
 * @type {z.infer<typeof LinkSchema>}
 */
export const createLink = async (values: z.infer<typeof CreateLinkSchema>) => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  // Create new link:
  const result = await db.link.create({
    data: {
      ...values,
      creatorId: currentUser.user?.id,
    },
  });

  revalidatePath("/dashboard");

  return result;
};

/**
 * Update link data.
 * Authentication required.
 * @type {z.infer<typeof LinkSchema>}
 */
export const updateLink = async (values: z.infer<typeof LinkSchema>) => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  // Update link:
  const result = await db.link.update({
    where: { slug: values.slug },
    data: {
      ...values,
      creatorId: currentUser.user?.id,
    },
  });

  return result;
};

/**
 * Delete link.
 * Authentication required.
 * @type {number()}
 */
export const deleteLink = async (id: number) => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  // Update link:
  const result = await db.link.delete({
    where: { id: id, creatorId: currentUser.user?.id },
  });

  return result;
};
