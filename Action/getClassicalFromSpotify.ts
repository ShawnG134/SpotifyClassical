import { ClassicalPiece, Song } from "@/types";
import axios from "axios";

export async function getClassicalFromSpotify(
  composer: string,
  workTitle: string,
  accessToken: string,
): Promise<Song[]> {
  const url = "https://api.spotify.com/v1/search";
  const query = `track:${workTitle} artist:${composer}`;
  const params = {
    q: query,
    type: "track",
    market: "US", // Adjust the market as necessary
    limit: 50, // Adjust the limit as per requirements
  };
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(url, { params, headers });
    const tracks = response.data.tracks.items.map((track: any) => ({
      id: track.id,
      user_id: "default", // Assuming 'user_id' needs to be populated by your application logic
      author: track.artists.map((artist: any) => artist.name).join(", "),
      title: track.name,
      song_path: track.external_urls.spotify,
      image_path: track.album.images[0]?.url || "",
    }));
    return tracks;
  } catch (error) {
    console.error("Error fetching classical music from Spotify:", error);
    throw new Error("Failed to fetch classical music from Spotify");
  }
}
