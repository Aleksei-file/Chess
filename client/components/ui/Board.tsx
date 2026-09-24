/**
 * Chess board component.
 */

'use client';

import type { JSX } from 'react';
import { Chessboard, type ChessboardOptions } from 'react-chessboard';

interface IBoardProps {
  options?: ChessboardOptions;
}

function Board(props: IBoardProps): JSX.Element {
  return <Chessboard options={props.options} />;
}

export { Board, type IBoardProps };
