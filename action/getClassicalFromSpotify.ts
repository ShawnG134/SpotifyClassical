import {SpotifyAlbum} from "@/types";
import axios from "axios";

export async function getClassicalFromSpotify(
	composer: string,
	workTitle: string,
	accessToken: string,
): Promise<SpotifyAlbum[]> {
	const url = "https://api.spotify.com/v1/search";
	const query = `${composer + " " + workTitle}`;
	console.log(query);
	const params = {
		q: query,
		type: "album",
		market: "US",
		limit: 20,
	};
	const headers = {
		Authorization: `Bearer ${accessToken}`,
		"Content-Type": "application/json",
	};

	try {
		const response = await axios.get(url, {params, headers});
		console.log(response);
		const albums = response.data.albums.items.map((album: any) => ({
			id: album.id,
			author: album.artists.map((artist: any) => artist.name).join(", "),
			title: album.name,
			album_path: album.external_urls.spotify,
			image_path: album.images[0]?.url || "",
		}));
		return albums;
	} catch (error) {
		console.error("Error fetching classical music albums from Spotify:", error);
		throw new Error("Failed to fetch classical music albums from Spotify");
	}
}
