"use client";
import React, { useEffect, useState } from "react";
import { Song } from "@/types";
import Cookies from "js-cookie";
import { getSongsFromSpotifyAlbum } from "@/action/getSongsFromSpotifyAlbum";
import SongList from "@/components/SongList";

const Page = () => {
	const [albumId, setAlbumId] = useState("");
	const [albumPieceList, setAlbumPieceList] = useState<Song[]>([]);
	const [albumDetails, setAlbumDetails] = useState<{ name: string, image: string } | null>(null);
	const accessToken = Cookies.get("spotify_access_token");

	useEffect(() => {
		async function fetchData() {
			const searchParams: URLSearchParams = new URLSearchParams(
				window.location.search
			);
			const id: string | null = searchParams.get("id");
			if (id && accessToken) {
				setAlbumId(id);
				const pieceList = await getSongsFromSpotifyAlbum(id, accessToken);
				if (pieceList.length > 0) {
					setAlbumDetails({
						name: pieceList[0].title,
						image: pieceList[0].image_path
					});
				}
				setAlbumPieceList(pieceList);
			}
		}
		fetchData();
	}, []);

	return (
		<div className="min-h-screen bg-black text-white p-6">
			{albumId && albumDetails && (
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-8">
						<img src={albumDetails.image} alt={albumDetails.name} className="w-64 h-64 mx-auto mb-4 rounded-lg shadow-lg" />
						<h1 className="text-4xl font-bold">{albumDetails.name}</h1>
					</div>
					<SongList albumPieceList={albumPieceList} />
				</div>
			)}
		</div>
	);
};

export default Page;
