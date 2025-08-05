import type { NextApiRequest, NextApiResponse } from "next";
import { getUserSettings } from "server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username: currentUser } = req.query;

  if (!currentUser || typeof currentUser !== "string") {
    return res.status(400).json({ error: "Missing or invalid username" });
  }

  try {
    const settings = await getUserSettings(currentUser);
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
