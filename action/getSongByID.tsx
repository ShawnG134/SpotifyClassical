import { Song } from "@/types";
import axios from "axios";
import Cookies from "js-cookie";

export async function getSongByID(
	trackId: string
): Promise<Song> {
	const accessToken = Cookies.get("spotify_access_token");
	const url = `https://api.spotify.com/v1/tracks/${trackId}`;
	const headers = {
		Authorization: `Bearer ${accessToken}`,
		"Content-Type": "application/json",
	};
	try {
		const response = await axios.get(url, { headers });
		const track = response.data;

		const song: Song = {
			id: track.id,
			user_id: track.uri,
			author: track.artists.map((artist: any) => artist.name).join(", "),
			title: track.name,
			song_path: track.external_urls.spotify,
			image_path: track.album.images[0]?.url || "",
		};

		return song;
	} catch (error) {
		console.error("Error fetching track from Spotify:", error);
		throw new Error("Failed to fetch track from Spotify");
	}
}
