"use client";
import React, { memo, useMemo } from "react";
import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSongById";
import { WebPlayback } from "@/components/PlayerContent";
import Cookies from "js-cookie";

const Player = () => {
	const player = usePlayer();
	const { song } = useGetSongById(player.activeId);
	const accessToken = useMemo(() => Cookies.get("spotify_access_token"), []);
	const trackUri = song?.user_id ?? "";

	if (!song || !trackUri || !player.activeId) {
		return null;
	}

	return (
		<div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
			<WebPlayback key={trackUri} token={accessToken!} trackUri={trackUri} />
		</div>
	);
};

export default memo(Player);
