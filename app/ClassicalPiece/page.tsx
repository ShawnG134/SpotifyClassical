"use client";
import React, {useEffect, useState} from "react";
import {SpotifyAlbum} from "@/types";
import Cookies from "js-cookie";
import {getClassicalAlbumFromSpotify} from "@/action/getClassicalAlbumFromSpotify";
import ClassicalPieceTable from "@/components/ClassicalPieceTable";
import {useRouter} from "next/navigation";

const Page = () => {
	const [classicalPieceName, setClassicalPieceName] = useState<SpotifyAlbum[]>([]);
	const accessToken = Cookies.get("spotify_access_token");

	useEffect(() => {
		async function fetchData() {
			const searchParams: URLSearchParams = new URLSearchParams(
				window.location.search,
			);
			const name: string | null = searchParams.get("name");
			const composer: string | null = searchParams.get("composer");
			if (name && composer && accessToken) {
				const pieceList = await getClassicalAlbumFromSpotify(
					composer,
					name,
					accessToken,
				);
				setClassicalPieceName(pieceList);
				console.log(pieceList);
			} else {
				console.error("parameter is missing in the URL");
			}
		}

		fetchData();
	}, []);
	return <ClassicalPieceTable songs={classicalPieceName}></ClassicalPieceTable>;
};

export default Page;
