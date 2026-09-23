/**
 * Displays the active chess game for a specific saved match ID.
 */
import type { JSX } from 'react';
import GameBoard from '@/components/GameBoard';

export default async function GamePage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}): Promise<JSX.Element> {
  const { gameId } = await params;
  return (
    <div className="flex flex-col items-center gap-4">
      <div>{`Game page for ${gameId}`}</div>
      <GameBoard />
    </div>
  );
}
