"use client";

import {ClassicalPiece} from "@/types";
import React from "react";
import MediaItem from "@/components/Mediaitem";
import {useRouter} from "next/navigation";

interface SearchContentProps {
	songs: ClassicalPiece[];
}





const SearchContent: React.FC<SearchContentProps> = ({songs}) => {
	const router = useRouter();
	const handleClick = (workTitle: string, composer: string) => {
		router.push(`/ClassicalPiece?name=${encodeURIComponent(workTitle)}&composer=${encodeURIComponent(composer)}`);
	};
	if (songs.length === 0) {
		return (
			<div
				className="
          flex
          flex-col
          gap-y-2
          w-full
          px-6
          text-neutral-400
        "
			>
				No songs found.
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-y-2 w-full px-6">
			{songs.map((piece: ClassicalPiece) => (
				<div key={piece.id} className="flex items-center gap-x-4 w-full">
					<div className="flex-1" onClick={() => {
						handleClick(piece.WorkTitle, piece.Composer)
					}}>
						<MediaItem onClick={() => {
						}} data={piece}/>
					</div>
				</div>
			))}
		</div>
	);
};

export default SearchContent;
