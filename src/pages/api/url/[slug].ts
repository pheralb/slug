import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({
      error: "[X] Error: Missing slug? Remember that urls start like this: /u/yourLink",
    });
  }

  const data = await prisma.link.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    return res.status(404).json({
      error: "[X] Error: Link not found or removed. Go to slug.vercel.app and create a new link.",
    });
  }

  // Cache:
  res.setHeader("Cache-Control", "s-maxage=1000000, stale-while-revalidate");

  return res.json(data);
};
