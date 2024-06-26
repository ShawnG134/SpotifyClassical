import { VFC, useState, useEffect, useRef } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import Slider from "@/components/Slider";

type Props = {
	token: string;
	trackUri: string;
};

export const WebPlayback: VFC<Props> = ({ token, trackUri }) => {
	const [is_paused, setPaused] = useState<boolean>(false);
	const [is_active, setActive] = useState<boolean>(false);
	const [current_track, setTrack] = useState<Spotify.Track | null>(null);
	const playerRef = useRef<Spotify.Player | null>(null);
	const deviceIdRef = useRef<string | null>(null);

	const Icon = is_paused ? BsPlayFill : BsPauseFill;

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: "Web Playback SDK",
				getOAuthToken: (cb) => {
					cb(token);
				},
				volume: 0.5,
			});

			playerRef.current = player;

			player.addListener("ready", ({ device_id }) => {
				deviceIdRef.current = device_id;
				console.log("Ready with Device ID", device_id);

				playTrack(trackUri);
			});

			player.addListener("not_ready", ({ device_id }) => {
				console.log("Device ID has gone offline", device_id);
			});

			player.addListener("player_state_changed", (state) => {
				if (!state) {
					return;
				}

				setTrack(state.track_window.current_track);
				setPaused(state.paused);
				setActive(true);
			});

			player.connect();
		};
	}, [token]);

	useEffect(() => {
		if (is_active) {
			playTrack(trackUri);
		}
	}, []);

	const playTrack = (uri: string) => {
		if (deviceIdRef.current) {
			fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceIdRef.current}`, {
				method: 'PUT',
				body: JSON.stringify({ uris: [uri] }),
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			});
		}
	};

	if (!playerRef.current) {
		return (
			<div className="container">
				<div className="main-wrapper">
					<b></b>
				</div>
			</div>
		);
	} else if (!is_active) {
		return (
			<div className="container">
				<div className="main-wrapper">
					<b>
						Loading
					</b>
				</div>
			</div>
		);
	} else {
		return (
			<div className="grid grid-cols-2 md:grid-cols-3 h-full">
				<div className="flex w-full justify-start">
					<div className="flex items-center gap-x-4">
						<div>
							<div className="now-playing__name">{current_track?.name}</div>
						</div>
					</div>
				</div>

				<div className="flex md:hidden col-auto w-full justify-end items-center">
					<div
						onClick={() => playerRef.current?.togglePlay()}
						className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
					>
						<Icon size={30} className="text-black" />
					</div>
				</div>

				<div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
					<AiFillStepBackward
						onClick={() => playerRef.current?.previousTrack()}
						size={30}
						className="text-neutral-400 cursor-pointer hover:text-white transition"
					/>
					<div
						onClick={() => playerRef.current?.togglePlay()}
						className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
					>
						<Icon size={30} className="text-black" />
					</div>
					<AiFillStepForward
						onClick={() => playerRef.current?.nextTrack()}
						size={30}
						className="text-neutral-400 cursor-pointer hover:text-white transition"
					/>
				</div>

				<div className="hidden md:flex w-full justify-end pr-2">
					<div className="flex items-center gap-x-2 w-[120px]">
						<Slider value={0.5} onChange={value => playerRef.current?.setVolume(value)} />
					</div>
				</div>
			</div>
		);
	}
};
