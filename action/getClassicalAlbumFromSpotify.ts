import { SpotifyAlbum } from "@/types";
import axios from "axios";
import {famousComposers} from "@/utils/constants";
import {calculateSimilarity} from "@/utils/levenshetinDistance";

export async function getClassicalAlbumFromSpotify(
	composer: string,
	workTitle: string,
	accessToken: string,
): Promise<SpotifyAlbum[]> {
	const url = "https://api.spotify.com/v1/search";
	const query = `${composer + " " + workTitle}`;
	const params = {
		q: query,
		type: "album",
		market: "US",
		limit: 50,
	};
	const headers = {
		Authorization: `Bearer ${accessToken}`,
		"Content-Type": "application/json",
	};

	try {
		const response = await axios.get(url, { params, headers });

		const albums = response.data.albums.items.map((album: any) => {
			const artistsString = album.artists.map((artist: any) => artist.name).join(", ");
			const artistsArray = artistsString.split(", ").filter((artist: string) => !famousComposers.includes(artist));
			const filteredAuthors = artistsArray[0];
			const year = album.release_date.split("-")[0];
			return {
				id: album.id,
				author: filteredAuthors,
				title: album.name,
				song_path: album.external_urls.spotify,
				image_path: album.images[0]?.url || "",
				year: year,
				popularity: album.popularity
			};
		});

		const filteredAlbums = albums.filter(album => {
			//const distance = modifiedLevenshtein(workTitle.toLowerCase(), album.title.toLowerCase());
			const similarity =calculateSimilarity(workTitle.toLowerCase(), album.title.toLowerCase());
			return similarity > 0.1;
		});

		return filteredAlbums;
	} catch (error) {
		console.error("Error fetching classical music albums from Spotify:", error);
		throw new Error("Failed to fetch classical music albums from Spotify");
	}
}
