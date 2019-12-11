import React from "react";
import Square from "./Square";
import Knight from "./Knight";
import BoardSquare from "./BoardSquare";
import { moveKnight, canMoveKnight } from "../Game";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

function handleSquareClick(toX, toY) {
  if (canMoveKnight(toX, toY)) {
    moveKnight(toX, toY);
  }
}

function renderPiece(x, y, [knightX, knightY]) {
  if (x === knightX && y === knightY) {
    return <Knight />;
  }
}

function renderSquare(i, knightPosition) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  return (
    <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
      <BoardSquare x={x} y={y}>
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </div>
  );
}

export default function Board({ knightPosition }) {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }

  return (
    <DndProvider backend={Backend}>
      <div
        style={{
          width: "516px",
          height: "516px",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {squares}
      </div>
    </DndProvider>
  );
}
