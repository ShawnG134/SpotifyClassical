import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

let accessToken: string | null = null;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!accessToken) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};
