"use client";

import {SpotifyAlbum} from "@/types";
import AlbumCoverSpotify from "@/components/AlbumCoverSpotify";
import Loading from "@/app/Search/loading";

interface PageContentProps {
	songs: SpotifyAlbum[];
}

const ClassicalPieceTable: React.FC<PageContentProps> = ({songs = []}) => {
	if (songs.length === 0) {
		return <Loading></Loading>
	}

	return (
		<div
			className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4
      "
		>
			{songs.map((item) => (
				<AlbumCoverSpotify key={item.id} data={item}/>
			))}
		</div>
	);
};

export default ClassicalPieceTable;
