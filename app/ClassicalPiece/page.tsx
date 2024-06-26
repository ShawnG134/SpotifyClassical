"use client";
import React, {useEffect, useState} from "react";
import {SpotifyAlbum} from "@/types";
import Cookies from "js-cookie";
import {getClassicalFromSpotify} from "@/action/getClassicalFromSpotify";
import ClassicalPieceTable from "@/components/ClassicalPieceTable";

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
				const pieceList = await getClassicalFromSpotify(
					composer,
					name,
					accessToken,
				);
				setClassicalPieceName(pieceList);
			} else {
				console.error("parameter is missing in the URL");
			}
		}

		fetchData();
	}, []);
	return <ClassicalPieceTable songs={classicalPieceName}></ClassicalPieceTable>;
};

export default Page;
