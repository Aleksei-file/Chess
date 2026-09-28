/**
 * Chess board component.
 */

'use client';

import type { JSX } from 'react';
import {
  Chessboard,
  type ChessboardOptions,
  type PieceDropHandlerArgs,
  type PieceHandlerArgs,
  type SquareHandlerArgs,
} from 'react-chessboard';

interface IBoardProps {
  options?: ChessboardOptions;
}

function Board(props: IBoardProps): JSX.Element {
  return <Chessboard options={props.options} />;
}

export {
  Board,
  type IBoardProps,
  type PieceDropHandlerArgs,
  type ChessboardOptions,
  type PieceHandlerArgs,
  type SquareHandlerArgs,
};
