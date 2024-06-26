export interface SpotifyAlbum {
	id: string;
	user_id: string;
	author: string;
	title: string;
	song_path: string;
	image_path: string;
	year: string;
	popularity: string;
}

export type ClassicalPiece = {
	id: number;
	Composer: string;
	WorkTitle: string;
};

export interface Song {
	id: string
	user_id: string
	author: string
	title: string
	song_path: string
	image_path: string
	album: string
}
