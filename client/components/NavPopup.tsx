/**
 * Renders the start/stop game confirmation popup. Fully controlled by its
 * caller (e.g. Nav) via the `isOpen`/`onOpenChange` props.
 */
'use client';

import type { JSX } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const confirmStartGame = (): void => {
    onOpenChange(false);
    router.push(`/game/${globalThis.crypto.randomUUID()}`);
  };

  return (
    <Popup
      open={isOpen}
      onOpenChange={onOpenChange}
      title={isGamePage ? 'Stop Game' : 'Start Game'}
    >
      <Button onClick={confirmStartGame} title={'Start'} />
    </Popup>
  );
}
