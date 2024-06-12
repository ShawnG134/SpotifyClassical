import { SpotifyApi } from "@spotify/web-api-ts-sdk";
require("dotenv").config();
const scopes = ["user-read-private", "user-read-email"];

class SpotifyService {
  private static instance: SpotifyApi;
  private constructor() {}

  public static getInstance(): SpotifyApi {
    if (!SpotifyService.instance) {
      SpotifyService.instance = SpotifyApi.withUserAuthorization(
        process.env.SPOTIFY_CLIENT_ID,
        process.env.REDIRECT_URI,
        scopes,
      );
    }
    return SpotifyService.instance;
  }
}

export default SpotifyService;
