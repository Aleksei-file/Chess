/**
 * Renders the app header navigation, including the start/stop game controls.
 * The game-start confirmation popup itself lives in NavPopup.
 */
'use client';

import { useState, type JSX } from 'react';
import { usePathname } from 'next/navigation';
import MenuButton from '@/components/MenuButton';
import SettingsButton from '@/components/SettingsButton';
import { Button } from '@/components/ui/Button';
import NavPopup from '@/components/NavPopup';

export default function Nav(): JSX.Element {
  const pathname = usePathname();
  const [isStartGameOpen, setIsStartGameOpen] = useState(false);
  const isGamePage = pathname.startsWith('/game/');

  const openStartGamePopup = (): void => setIsStartGameOpen(true);

  const stopGame = (): void => {
    // TODO: stop the game timer and navigate back to the home page.
  };

  const resignGame = (): void => {
    // TODO: resign the current game.
  };

  return (
    <nav
      aria-label="{'Basic navigation'}"
      className="flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <MenuButton onStartGameSelect={openStartGamePopup} />
        {isGamePage ? (
          <Button title={'Stop'} onClick={stopGame} />
        ) : (
          <Button title={'Start Game'} onClick={openStartGamePopup} />
        )}
      </div>

      <span>{'Chess'}</span>

      <div className="flex items-center gap-2">
        {isGamePage && <Button title={'Resign'} onClick={resignGame} />}
        <SettingsButton />
      </div>
      <NavPopup
        isOpen={isStartGameOpen}
        onOpenChange={setIsStartGameOpen}
        isGamePage={isGamePage}
      />
    </nav>
  );
}
