export interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}

export interface Composer {
  id: string;
  user_id: string;
  image_path: string;
}

export type ClassicalPiece = {
  id: number;
  Composer: string;
  WorkTitle: string;
};
