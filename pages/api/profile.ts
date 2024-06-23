import type {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const accessToken = req.headers.authorization?.split(" ")[1];

	if (!accessToken) {
		res.status(401).json({error: "Unauthorized"});
		return;
	}

	try {
		const response = await fetch("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.ok) {
			const data = await response.json();
			res.status(200).json(data);
		} else {
			res.status(response.status).json({error: response.statusText});
		}
	} catch (error) {
		console.error("Error fetching profile:", error);
		res.status(500).json({error: "Failed to fetch profile"});
	}
}
