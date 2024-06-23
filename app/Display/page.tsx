"use client";
import React, { useState, useEffect } from "react";
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
} from "@/app/Display/Container";

const DisplayComposer = () => {
  const [composerName, setComposerName] = useState("");
  const [composerPieces, setComposerPieces] = useState<ClassicalPiece[]>([]);
  const [currentPiece, setCurrentPiece] = useState<ClassicalPiece[]>([]);

  useEffect(() => {
    async function fetchData() {
      const searchParams = new URLSearchParams(window.location.search);
      const name = searchParams.get("name");
      if (name) {
        const pieces = await getClassicalPiecesByComposer(name);
        setComposerName(name);
        setComposerPieces(pieces);
        setCurrentPiece(pieces);
      }
    }
    fetchData();
  }, []);

  const handleClick = (workTitle: string, composer: string) => {
    window.location.href = `/ClassicalPiece?name=${encodeURIComponent(workTitle)}&composer=${encodeURIComponent(composer)}`;
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
          <Title>Pieces by {composerName}</Title>
          <ButtonContainer>
            <FilterButton onClick={() => filterPieces("Concerto")}>
              Concerto
            </FilterButton>
            <FilterButton onClick={() => filterPieces("Sonata")}>
              Sonata
            </FilterButton>
            <FilterButton onClick={() => filterPieces("Nocturne")}>
              Nocturne
            </FilterButton>
            <FilterButton onClick={() => filterPieces("Ballade")}>
              Ballade
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
        <Loading />
      )}
    </StyledComposerContainer>
  );
};

export default DisplayComposer;
