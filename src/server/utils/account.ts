import { db } from "@/server/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });

    return account;
  } catch {
    console.error("Error getting account by user id - getAccountByUserId()");
    return null;
  }
};
