import React from "react";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

interface SongListProps {
	albumPieceList: Song[];
	onClick?: (id: string) => void;
}

const SongList: React.FC<SongListProps> = ({ albumPieceList, onClick }) => {
	const player = usePlayer();
	const handleClick = (piece: Song) => {
		if (onClick) {
			return onClick(piece.id);
		} else {
			player.setId(piece.id);
		}
	};

	return (
		<table className="min-w-full table-auto bg-gray-800 rounded-lg">
			<thead>
			<tr className="text-left border-b border-gray-700">
				<th className="p-4">#</th>
				<th className="p-4">Title</th>
				<th className="p-4">Play</th>
			</tr>
			</thead>
			<tbody>
			{albumPieceList.map((song, index) => (
				<tr key={song.id} className="border-b border-gray-700">
					<td className="p-4">{index + 1}</td>
					<td className="p-4">{song.title}</td>
					<td className="p-4">
						<button
							onClick={() => handleClick(song)}
							className="text-blue-500 hover:underline flex items-center"
						>
							<svg
								className="w-6 h-6 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M14.752 11.168l-6.016-3.608A1 1 0 007 8.361v7.279a1 1 0 001.736.678l6.016-3.608a1 1 0 000-1.732z"
								></path>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 12c0-4.97-4.03-9-9-9S3 7.03 3 12s4.03 9 9 9 9-4.03 9-9z"
								></path>
							</svg>
							Play
						</button>
					</td>
				</tr>
			))}
			</tbody>
		</table>
	);
};

export default SongList;
