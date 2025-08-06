import { NextApiRequest, NextApiResponse } from "next";
import { setDatabaseTheme } from "server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { newValue, currentUser } = req.body;

  try {
    await setDatabaseTheme(newValue, currentUser);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "bruh" });
  }
}
