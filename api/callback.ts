import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import querystring from "querystring";

const client_id = "CLIENT_ID";
const client_secret = "CLIENT_SECRET";
const redirect_uri = "http://localhost:3000/api/callback";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/?" +
        querystring.stringify({
          error: "state_mismatch",
        }),
    );
    return;
  }

  try {
    const authOptions = {
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      data: querystring.stringify({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
    };

    const response = await axios(authOptions);
    const access_token = response.data.access_token;

    res.redirect(
      "/?" +
        querystring.stringify({
          access_token: access_token,
        }),
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch access token" });
  }
}
