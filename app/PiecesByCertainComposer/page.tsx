"use client";
import React, { useEffect, useState } from "react";
import { ClassicalPiece } from "@/types";
import { getClassicalPiecesByComposer } from "@/action/getClassicalPieceByComposer";
import Loading from "@/app/Search/loading";
import styled from "styled-components";
import {
	ButtonContainer,
	FilterButton,
	PieceItem,
	PieceList,
	StyledComposerContainer,
	Title,
} from "@/app/PiecesByCertainComposer/Container";
import { useRouter, useSearchParams } from "next/navigation";
import imageSrc from "/Users/seangong/Desktop/Classical/utils/ComposerPicture/ClaudeDebussy.png";

const TopRightImage = styled.img`
    width: 150px;
    height: auto;
    margin-left: 50px;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`;

const DisplayComposer = () => {
	const [composerName, setComposerName] = useState("");
	const [composerPieces, setComposerPieces] = useState<ClassicalPiece[]>([]);
	const [currentPiece, setCurrentPiece] = useState<ClassicalPiece[]>([]);
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		async function fetchData() {
			const name = searchParams?.get("name");
			if (name) {
				const pieces = await getClassicalPiecesByComposer(name);
				setComposerName(name);
				setComposerPieces(pieces);
				setCurrentPiece(pieces);
			}
		}
		fetchData();
	}, [searchParams]);

	const handleClick = (workTitle: string, composer: string) => {
		router.push(`/ClassicalPiece?name=${encodeURIComponent(workTitle)}&composer=${encodeURIComponent(composer)}`);
	};

	const filterPieces = (type: string) => {
		const filteredPieces = composerPieces.filter((piece) =>
			piece.WorkTitle.includes(type),
		);
		setCurrentPiece(filteredPieces);
	};

	return (
		<StyledComposerContainer>
			{composerName ? (
				<>
					<TitleContainer>
						<Title>Pieces by {composerName}</Title>
						<TopRightImage src={imageSrc.src} alt="Top Right Image" />
					</TitleContainer>
					<ButtonContainer>
						<FilterButton onClick={() => filterPieces("Concerto")}>
							Concerto
						</FilterButton>
						<FilterButton onClick={() => filterPieces("Sonata")}>
							Sonata
						</FilterButton>
						<FilterButton onClick={() => filterPieces("Symphony")}>
							Symphony
						</FilterButton>
						<FilterButton onClick={() => filterPieces("String Quartet")}>
							String Quartet
						</FilterButton>
					</ButtonContainer>
					<PieceList>
						{currentPiece.map((piece, index) => (
							<PieceItem
								key={index}
								onClick={() => handleClick(piece.WorkTitle, piece.Composer)}
							>
								{piece.WorkTitle}
							</PieceItem>
						))}
					</PieceList>
				</>
			) : (
				<Loading/>
			)}
		</StyledComposerContainer>
	);
};

export default DisplayComposer;
