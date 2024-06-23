"use client";
import {useEffect, useState} from "react";
import Header from "@/components/Header";
import {getClassicalPiecesByTitle} from "@/action/getClassicalPieceByTitle";
import {ClassicalPiece} from "@/types";

export default function Home() {
	const [composers, setComposers] = useState<ClassicalPiece[]>([]);

	useEffect(() => {
		const fetchComposers = async () => {
			const fetchedComposers = await getClassicalPiecesByTitle("");
			setComposers(fetchedComposers);
		};

		fetchComposers();
	}, []);

	return (
		<div className="text-neutral-400 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
			<Header>
				<div className="mb-2">
					<h1 className="text-white text-3xl font-semibold">
						Welcome to Spotify Classical
					</h1>
				</div>
			</Header>
			<div className="mt-2 mb-7 px-6">
				<div className="flex justify-between items-center">
					<h1 className="text-white text-2xl font-semibold">
						Please pick a Composer or search a piece to start
					</h1>
				</div>
			</div>
			{/*<ComposerList composers={composers}></ComposerList>*/}
		</div>
	);
}
