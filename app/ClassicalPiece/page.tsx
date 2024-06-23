"use client";
import React, { useEffect, useState } from "react";
import { ClassicalPiece, Song } from "@/types";
import { getClassicalPiecesByComposer } from "@/action/getClassicalPieceByComposer";
import { useSpotifyAuth } from "@/context/SpotifyAuthContext";
import Cookies from "js-cookie";
import { getClassicalFromSpotify } from "@/action/getClassicalFromSpotify";

const Page = () => {
  const [classicalPieceName, setClassicalPieceName] = useState<Song[]>();
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
          name,
          composer,
          accessToken,
        );
        setClassicalPieceName(pieceList);
      } else {
        console.error("parameter is missing in the URL");
      }
    }

    fetchData();
  }, []);
  console.log(classicalPieceName);
  return <div>2</div>;
};

export default Page;
