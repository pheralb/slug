import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return await createNewLink(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "[X] Method not allowed: ", success: false });
  }
}

async function createNewLink(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  try {
    const newLink = await prisma.link?.create({
      data: {
        slug: body.slug,
        url: body.url,
        description: body.description,
      },
    });
    return res.status(200).json(newLink);
  } catch (error) {
    console.error("[X] Request error:", error);
    res.status(500).json({ error: "[X] Error creating question:", success: false });
  }
}
