/**
 * Renders the start/stop game confirmation popup. Its visibility is driven by
 * the StartGameContext, so it is mounted once by StartGameProvider.
 */
'use client';

import { useMemo, type JSX } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Popup } from '@/components/ui/Popup';
import { Button } from '@/components/ui/Button';
import { useStartGame } from '@/components/startGame/StartGameContext';

export default function StartGamePopup(): JSX.Element {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, close, setOpen } = useStartGame();
  const isGamePage = pathname.startsWith('/game/');
  const title = useMemo(
    (): string =>
      isGamePage ? t('startGame.stop_game') : t('startGame.start_game'),
    [isGamePage, t]
  );

  const confirmStartGame = (): void => {
    close();
    router.push(`/game/${globalThis.crypto.randomUUID()}`);
  };

  return (
    <Popup open={isOpen} onOpenChange={setOpen} title={title}>
      <Button onClick={confirmStartGame} title={t('startGame.start')} />
    </Popup>
  );
}
