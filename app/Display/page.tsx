"use client";
import React, { useState, useEffect } from "react";
import { ClassicalPiece } from "@/types";
import { getClassicalPiecesByComposer } from "@/action/getClassicalPieceByComposer";
import Loading from "@/app/Search/loading";
import styled from "styled-components";

const StyledComposerContainer = styled.div`
  padding: 24px;
  background-color: #121212;
  color: #fff;
  font-family: "Helvetica Neue", sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const PieceList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PieceItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #333;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1c1c1c;
  }
`;

const ButtonContainer = styled.div`
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  margin-right: 10px;
  background: none;
  border: 1px solid #fff;
  color: #fff;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }
`;

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
              <PieceItem key={index}>{piece.WorkTitle}</PieceItem>
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
