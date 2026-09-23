/**
 * Renders the start/stop game confirmation popup. Fully controlled by its
 * caller (e.g. Nav) via the `isOpen`/`onOpenChange` props.
 */
'use client';

import { useMemo, type JSX } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Popup } from '@/components/ui/Popup';
import { Button } from '@/components/ui/Button';

interface INavPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isGamePage: boolean;
}

export default function NavPopup({
  isOpen,
  onOpenChange,
  isGamePage,
}: INavPopupProps): JSX.Element {
  const t = useTranslations();
  const router = useRouter();
  const title = useMemo(
    (): string => (isGamePage ? t('nav.stop_game') : t('nav.start_game')),
    [isGamePage, t]
  );

  const confirmStartGame = (): void => {
    onOpenChange(false);
    router.push(`/game/${globalThis.crypto.randomUUID()}`);
  };

  return (
    <Popup open={isOpen} onOpenChange={onOpenChange} title={title}>
      <Button onClick={confirmStartGame} title={t('nav.start')} />
    </Popup>
  );
}
