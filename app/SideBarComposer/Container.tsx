import styled from "styled-components";

export const StyledComposerContainer = styled.div`
    padding: 24px;
    background-color: #121212;
    color: #fff;
    font-family: "Helvetica Neue", sans-serif;
`;

export const Title = styled.h1`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 20px;
`;

export const PieceList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const PieceItem = styled.li`
    padding: 10px 0;
    border-bottom: 1px solid #333;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #1c1c1c;
    }
`;

export const ButtonContainer = styled.div`
    margin-bottom: 20px;
`;

export const FilterButton = styled.button`
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
