import { VFC, useState, useEffect, useRef, useCallback, useReducer } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import Slider from "@/components/Slider";

type Props = {
	token: string;
	trackUri: string;
};

type State = {
	is_paused: boolean;
	is_active: boolean;
	current_track: Spotify.Track | null;
};

type Action =
	| { type: "SET_PAUSED"; payload: boolean }
	| { type: "SET_ACTIVE"; payload: boolean }
	| { type: "SET_TRACK"; payload: Spotify.Track | null };

const initialState: State = {
	is_paused: false,
	is_active: false,
	current_track: null,
};

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "SET_PAUSED":
			return { ...state, is_paused: action.payload };
		case "SET_ACTIVE":
			return { ...state, is_active: action.payload };
		case "SET_TRACK":
			return { ...state, current_track: action.payload };
		default:
			return state;
	}
}

export const WebPlayback: VFC<Props> = ({ token, trackUri }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const playerRef = useRef<Spotify.Player | null>(null);
	const deviceIdRef = useRef<string | null>(null);

	const Icon = state.is_paused ? BsPlayFill : BsPauseFill;

	const initializePlayer = useCallback(() => {
		if (playerRef.current) return;

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
			dispatch({ type: "SET_ACTIVE", payload: true });
			console.log("Ready with Device ID", device_id);
		});

		player.addListener("not_ready", ({ device_id }) => {
			console.log("Device ID has gone offline", device_id);
			dispatch({ type: "SET_ACTIVE", payload: false });
		});

		player.addListener("player_state_changed", (state) => {
			if (!state) return;
			dispatch({ type: "SET_TRACK", payload: state.track_window.current_track });
			dispatch({ type: "SET_PAUSED", payload: state.paused });
		});

		player.connect();
	}, [token]);

	useEffect(() => {
		if (!document.getElementById('spotify-player-script')) {
			const script = document.createElement("script");
			script.id = 'spotify-player-script';
			script.src = "https://sdk.scdn.co/spotify-player.js";
			script.async = true;

			document.body.appendChild(script);

			script.onload = () => {
				initializePlayer();
			};
		} else {
			initializePlayer();
		}

		return () => {
			if (playerRef.current) {
				playerRef.current.disconnect();
				playerRef.current = null;
			}
		};
	}, [initializePlayer]);

	useEffect(() => {
		if (state.is_active && deviceIdRef.current) {
			playTrack(trackUri);
		}
	}, [state.is_active, trackUri]);

	const playTrack = useCallback((uri: string) => {
		if (deviceIdRef.current) {
			fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceIdRef.current}`, {
				method: "PUT",
				body: JSON.stringify({ uris: [uri] }),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
		}
	}, [token]);

	useEffect(() => {
		if (state.current_track?.uri !== trackUri) {
			playTrack(trackUri);
		}
	}, [trackUri, state.current_track, playTrack]);

	if (!playerRef.current) {
		return (
			<div className="container">
				<div className="main-wrapper">
					<b>Loading...</b>
				</div>
			</div>
		);
	} else if (!state.is_active) {
		return (
			<div className="container">
				<div className="main-wrapper">
					<b>Loading...</b>
				</div>
			</div>
		);
	} else {
		return (
			<div className="grid grid-cols-2 md:grid-cols-3 h-full">
				<div className="flex w-full justify-start">
					<div className="flex items-center gap-x-4">
						<div>
							<div className="now-playing__name">{state.current_track?.name}</div>
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
			</div>
		);
	}
};
