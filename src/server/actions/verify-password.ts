"use server";

import { db } from "@/server/db";
import bcrypt from "bcryptjs";

export const verifyLinkPassword = async (slug: string, password: string) => {
    try {
        const link = await db.links.findUnique({
            where: {
                slug: slug,
            },
        });

        if (!link) {
            return { error: "Link not found." };
        }

        // If link has no password, technically it's valid, but we shouldn't be here.
        if (!link.password) {
            return { success: true, url: link.url };
        }

        const isValid = await bcrypt.compare(password, link.password);

        if (!isValid) {
            return { error: "Invalid password." };
        }

        // Update clicks if successful?
        // The redirect middleware does this. If we return success here, client will redirect to link.url.
        // But direct access via middleware increments clicks.
        // We should probably rely on client redirecting.
        // But if we return URL, client redirects.
        // If we want to count click effectively, maybe we should update here too?
        // Or just let it be.
        // Wait, the regular flow updates clicks in middleware.
        // If we bypass middleware by getting URL here and redirecting in client, checks are bypassed?
        // No, client just navigates to link.url.
        // We should probably increment stats here too since we "consumed" the link.

        await db.links.update({
            where: { id: link.id },
            data: {
                clicks: { increment: 1 },
                lastClicked: new Date(),
            },
        });

        return { success: true, url: link.url };
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong." };
    }
};
