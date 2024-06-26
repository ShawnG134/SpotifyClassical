"use client";

import {ClassicalPiece} from "@/types";
import usePlayer from "@/hooks/usePlayer";

interface MediaItemProps {
	data: ClassicalPiece;
	onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({data, onClick}) => {
	const player = usePlayer();
	return (
		<div
			onClick={() => onClick}
			className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-800/50
        w-full
        p-2
        rounded-md
      "
		>

			<div className="flex flex-col gap-y-1">
				<div className="flex flex-col gap-y-1 overflow-hidden">
					<p className="text-white truncate">{data.WorkTitle}</p>
					<p className="text-neutral-400 text-sm truncate">
						By {data.Composer}
					</p>
				</div>
			</div>
		</div>
	);
};

export default MediaItem;
