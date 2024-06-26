import { Song, SpotifyAlbum } from "@/types";
import axios from "axios";
import {famousComposers} from "@/utils/constants";


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

		const songs = album.tracks.items.map((track: any) => {
			const artistsString = track.artists.map((artist: any) => artist.name).join(", ");
			const artistsArray = artistsString.split(", ").filter((artist: string) => !famousComposers.includes(artist));

			return {
				id: track.id,
				user_id: "",
				author: artistsArray,
				title: track.name,
				album: album.name,
				song_path: track.external_urls.spotify,
				image_path: album.images[0]?.url || "",
			};
		});

		return songs;
	} catch (error) {
		console.error("Error fetching album songs from Spotify:", error);
		throw new Error("Failed to fetch album songs from Spotify");
	}
}
