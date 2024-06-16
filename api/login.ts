import type { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = `${process.env.BASE_URL}/api/callback`;
  const state = "20";
  const scope = "user-read-private user-read-email";

  const queryParams = stringify({
    response_type: "code",
    client_id,
    redirect_uri,
    scope,
    state,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
}
