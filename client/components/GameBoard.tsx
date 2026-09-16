/**
 * Renders the interactive chess board used in the game view.
 */
'use client';

import type { JSX } from 'react';
import { Chessboard } from 'react-chessboard';

export function GameBoard(): JSX.Element {
  return (
    <div>
      <Chessboard />
    </div>
  );
}
