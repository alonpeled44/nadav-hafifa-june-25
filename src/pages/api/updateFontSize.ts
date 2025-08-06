import { NextApiRequest, NextApiResponse } from "next";
import { setDatabaseFontSize } from "server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { newValue, currentUser } = req.body;

  try {
    await setDatabaseFontSize(newValue, currentUser);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "sadge" });
  }
}
