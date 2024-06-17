import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const { piece, artist } = req.query;

  if (!accessToken) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!piece || !artist) {
    res
      .status(400)
      .json({ error: "Missing required query parameters: piece and artist" });
    return;
  }

  try {
    const query = `q=${encodeURIComponent(piece)}%20artist:${encodeURIComponent(artist)}&type=track`;
    const response = await fetch(`https://api.spotify.com/v1/search?${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ error: response.statusText });
    }
  } catch (error) {
    console.error("Error searching pieces:", error);
    res.status(500).json({ error: "Failed to search pieces" });
  }
}
