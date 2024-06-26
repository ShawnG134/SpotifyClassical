import Header from "@/components/Header";
import React from "react";

import SearchInput from "@/components/SearchInput";
import SearchContent from "@/app/Search/searchContent";
import {getClassicalPiecesByTitle} from "@/action/getClassicalPieceByTitle";
import {ClassicalPiece} from "@/types";

interface SearchProps {
	searchParams: {
		title: string;
	};
}

export default async function Page({searchParams}: SearchProps) {
	let songs: ClassicalPiece[] = [];
	if (searchParams.title != "") {
		songs = await getClassicalPiecesByTitle(searchParams.title);
	}
	return (
		<div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
			<Header className="from-bg-neutral-900">
				<div className="mb-2 flex flex-col gap-y-6">
					<h1 className="text-white text-3xl font-semibold">Search</h1>
					<SearchInput/>
				</div>
			</Header>
			<SearchContent songs={songs}/>
		</div>
	);
}
