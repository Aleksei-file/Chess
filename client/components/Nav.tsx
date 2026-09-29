/**
 * Renders the app header navigation, including the start/stop game controls.
 * The game-start confirmation popup is owned by StartGameProvider.
 */
'use client';

import { useMemo, type JSX } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import MenuButton from '@/components/MenuButton';
import SettingsButton from '@/components/SettingsButton';
import { Button } from '@/components/ui/Button';
import StartGameButton from '@/components/startGame/StartGameButton';
import styles from './Nav.module.scss';

export default function Nav(): JSX.Element {
  const t = useTranslations();
  const pathname = usePathname();
  const isGamePage = useMemo(
    (): boolean => pathname.startsWith('/game/'),
    [pathname]
  );
  const isHomePage = pathname === '/';

  const stopGame = (): void => {
    // TODO: stop the game timer and navigate back to the home page.
  };

  const resignGame = (): void => {
    // TODO: resign the current game.
  };

  return (
    <nav
      aria-label={t('nav.label')}
      className="relative flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <MenuButton />
        {isGamePage ? (
          <Button title={t('nav.stop')} onClick={stopGame} />
        ) : (
          <StartGameButton
            title={t('startGame.start_game')}
            className={styles.StartButton}
          />
        )}
      </div>
      {!isHomePage && (
        <a
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span role="img" aria-label={t('nav.logo')} className={styles.Logo} />
        </a>
      )}
      <div className="flex items-center gap-2">
        {isGamePage && <Button title={t('nav.resign')} onClick={resignGame} />}
        <SettingsButton />
      </div>
    </nav>
  );
}
