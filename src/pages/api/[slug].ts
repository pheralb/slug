import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({
      error: "Error: Missing slug. Go to urll.vercel.app and create a link.",
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
    return res.redirect("/404");
  }

  return res.redirect(data.url);
};
