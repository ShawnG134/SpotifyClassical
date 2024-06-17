import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = "http://localhost:3000";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const state = Math.random().toString(36).substring(7);
  const scope = "user-read-private user-read-email";
  console.log("hihihihi");
  const queryString = querystring.stringify({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryString}`);
};
