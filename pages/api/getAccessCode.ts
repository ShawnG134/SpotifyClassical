import type {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import querystring from "querystring";
import Cookies from "js-cookie";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const {code} = req.body;

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
		Cookies.set("spotify_access_token", response.data.access_token, {
			expires: 1, // 1 day
			secure: true, // for HTTPS
			sameSite: "None", // necessary for cross-origin cookies
		});
		res.status(200).json({access_token});
	} catch (error) {
		console.error("Error fetching access token:", error);
		res.status(500).json({error: "Failed to fetch access token"});
	}
}
