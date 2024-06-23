"use client";
import React, { useEffect, useState } from "react";
import { ClassicalPiece } from "@/types";
import { getClassicalPiecesByComposer } from "@/action/getClassicalPieceByComposer";
import { useSpotifyAuth } from "@/context/SpotifyAuthContext";
import Cookies from "js-cookie";

const Page = () => {
  const [classicalPieceName, setClassicalPieceName] = useState<string>();
  const accessToken = Cookies.get("spotify_access_token");
  useEffect(() => {
    async function fetchData() {
      const searchParams = new URLSearchParams(window.location.search);
      const name = searchParams.get("name");
      if (name) {
        setClassicalPieceName(name);
      }
    }
    fetchData();
  }, []);
  console.log(accessToken);
  return <div>{accessToken}</div>;
};

export default Page;
