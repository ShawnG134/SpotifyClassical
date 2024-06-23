import {NextApiRequest, NextApiResponse} from "next";
import querystring from "querystring";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = "http://localhost:3000";

const scope = [
	"user-read-email",
	"playlist-read-private",
	"playlist-read-collaborative",
	"user-read-email",
	"streaming",
	"user-read-private",
	"user-library-read",
	"user-top-read",
	"user-read-playback-state",
	"user-modify-playback-state",
	"user-read-currently-playing",
	"user-read-recently-played",
	"user-follow-read",
].join(",");

export default (req: NextApiRequest, res: NextApiResponse) => {
	const state = Math.random().toString(36).substring(7);
	const queryString = querystring.stringify({
		response_type: "code",
		client_id: client_id,
		scope: scope,
		redirect_uri: redirect_uri,
		state: state,
	});

	res.redirect(`https://accounts.spotify.com/authorize?${queryString}`);
};
