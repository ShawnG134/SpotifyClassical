"use client";

import Image from "next/image";

import {SpotifyAlbum} from "@/types";
import React from "react";
import PlayButton from "@/components/PlayButton";
import {useRouter} from "next/navigation";

interface SongItemProps {
	data: SpotifyAlbum;
	// onClick: (id: string) => void
}

const AlbumCoverSpotify: React.FC<SongItemProps> = ({data}) => {
	const imagePath = data.image_path;
	const router = useRouter();
	const handleClick = (id: string) => {
		router.push(`/AlbumDisplay?id=${encodeURIComponent(id)}`);
	};

	return (
		<div
			onClick={() => handleClick(data.id)}
			className="
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        p-3
      "
		>
			<div
				className="
          relative
          aspect-square
          w-full
          h-full
          rounded-md
          overflow-hidden
        "
			>
				<Image
					className="object-cover"
					src={imagePath || "/images/music-placeholder.png"}
					fill
					alt="Image"
				/>
			</div>
			<div className="flex flex-col items-start w-full pt-4 gap-y-1">
				<p className="font-semibold truncate w-full">{data.author}</p>
				<p
					className="
            text-neutral-400
            text-sm
            pb-4
            w-full
            truncate
          "
				>
					{data.year}
				</p>
			</div>
			<div
				className="
          absolute
          bottom-24
          right-5
        "
			>
				<PlayButton />
			</div>
		</div>
	);
};

export default AlbumCoverSpotify;
