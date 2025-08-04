import type { NextApiRequest, NextApiResponse } from "next";
import { getUsers } from "server";

export interface User {
  id: number;
  username: string;
  password: string;
  theme: string;
  fontSize: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error loading users:", err);
    res.status(500).json({ error: "Failed to load users" });
  }
}
