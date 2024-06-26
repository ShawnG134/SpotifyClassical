import {Song, SpotifyAlbum} from "@/types";
import axios from "axios";

export async function getSongsFromSpotifyAlbum(
	albumId: string,
	accessToken: string,
): Promise<Song[]> {
	const url = `https://api.spotify.com/v1/albums/${albumId}`;
	const headers = {
		Authorization: `Bearer ${accessToken}`,
		"Content-Type": "application/json",
	};

	try {
		const response = await axios.get(url, { headers });
		const album = response.data;

		const songs = album.tracks.items.map((track: any) => ({
			id: track.id,
			user_id: "",
			author: track.artists.map((artist: any) => artist.name).join(", "),
			title: track.name,
			song_path: track.external_urls.spotify,
			image_path: album.images[0]?.url || "",
		}));

		return songs;
	} catch (error) {
		console.error("Error fetching album songs from Spotify:", error);
		throw new Error("Failed to fetch album songs from Spotify");
	}
}
