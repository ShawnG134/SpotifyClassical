import { ClassicalPiece, Song } from "@/types";
import { supabase } from "@/utils/supabaseClient";
import { useSpotifyAuth } from "@/context/SpotifyAuthContext";
import Cookies from "js-cookie";

// export async function getClassicalFromSpotify(
//   composer: string,
// ): Promise<string> {
//   const accessToken = Cookies.get("spotify_access_token");
//   return accessToken;
// }
