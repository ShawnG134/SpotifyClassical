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
		<div className="text-neutral-400 rounded-lg w-full h-full overflow-hidden overflow-y-auto bg-gray-900">
			<Header>
				<div className="mb-4">
					<h1 className="text-white text-4xl font-bold">
						Welcome to Spotify Classical
					</h1>
				</div>
			</Header>
			<div className="mt-4 mb-8 px-8">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-white text-2xl font-semibold">
						Please pick a composer or search for a piece to start
					</h2>
				</div>
				<div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg">
					<h3 className="text-white text-xl font-semibold mb-2">
						Motivation
					</h3>
					<p className="text-neutral-300">
						I was deeply intrigued by the design and functionality of Apple Classical. As a fan of Gabriel Fauré, whose piano works I highly recommend, I often found it difficult to locate his recordings. Apple Music elegantly resolves this issue, allowing me to enjoy numerous different versions of his compositions.
					</p>
					<p className="text-neutral-300 mt-2">
						Unfortunately, Spotify does not natively support a similar feature. As a result, I decided to develop my own Spotify Classical Player using Next.js.
					</p>
				</div>
				<div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg">
					<h3 className="text-white text-xl font-semibold mb-2">
						Functionality
					</h3>
					<ul className="text-neutral-300 list-disc list-inside space-y-1">
						<li>Discover different recordings of the same classical piece: Enables users to explore various recordings of the same classical music piece.</li>
						<li>Find a complete list of classical pieces by a composer: Provides an exhaustive list of all classical compositions from a specific composer.</li>
						<li>Filter by composition type: Allows users to filter compositions by type (Concerto, Sonata, Symphony) for a specific composer.</li>
						<li>To be determined: Additional features will be added based on user needs and feedback.</li>
					</ul>
				</div>
			</div>
			{/* <ComposerList composers={composers}></ComposerList> */}
		</div>
	);
}
