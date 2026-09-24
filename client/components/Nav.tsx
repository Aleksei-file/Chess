/**
 * Renders the app header navigation, including the start/stop game controls.
 * The game-start confirmation popup itself lives in NavPopup.
 */
'use client';

import { useMemo, useState, type JSX } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import MenuButton from '@/components/MenuButton';
import SettingsButton from '@/components/SettingsButton';
import { Button } from '@/components/ui/Button';
import NavPopup from '@/components/NavPopup';
import styles from './Nav.module.scss';

export default function Nav(): JSX.Element {
  const t = useTranslations();
  const pathname = usePathname();
  const [isStartGameOpen, setIsStartGameOpen] = useState(false);
  const isGamePage = useMemo(
    (): boolean => pathname.startsWith('/game/'),
    [pathname]
  );

  const openStartGamePopup = (): void => setIsStartGameOpen(true);

  const stopGame = (): void => {
    // TODO: stop the game timer and navigate back to the home page.
  };

  const resignGame = (): void => {
    // TODO: resign the current game.
  };

  return (
    <nav
      aria-label={t('nav.label')}
      className="flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <MenuButton onStartGameSelect={openStartGamePopup} />
        {isGamePage ? (
          <Button title={t('nav.stop')} onClick={stopGame} />
        ) : (
          <Button title={t('nav.start_game')} onClick={openStartGamePopup} />
        )}
      </div>
      <a href="/">
        <span role="img" aria-label={t('nav.logo')} className={styles.Logo} />
      </a>
      <div className="flex items-center gap-2">
        {isGamePage && <Button title={t('nav.resign')} onClick={resignGame} />}
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
