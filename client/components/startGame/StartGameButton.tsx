/**
 * Button that requests a new game through the StartGameContext. Usable from
 * server-rendered pages, which cannot attach click handlers themselves.
 */
'use client';

import type { JSX } from 'react';
import { Button, type IButtonProps } from '@/components/ui/Button';
import { useStartGame } from '@/components/startGame/StartGameContext';

export default function StartGameButton(
  props: Omit<IButtonProps, 'onClick'>
): JSX.Element {
  const { open } = useStartGame();
  return <Button {...props} onClick={open} />;
}
