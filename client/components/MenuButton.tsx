/**
 * Renders the primary navigation trigger for the header menu.
 */
'use client';

import type { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { TiThMenu } from 'react-icons/ti';
import HeaderIcon from '@/components/HeaderIcon';
import { DropdownButton } from '@/components/ui/DropdownButton';
import type { IDropdownButtonItem } from '@/components/ui/Interfaces';

const ROUTES: Record<string, string> = {
  history: '/history',
  about: '/about',
};

const menuItemIds: Record<string, string> = {
  startGame: 'startGame',
  history: 'history',
  about: 'about',
};

const items: IDropdownButtonItem[] = [
  { type: 'item', label: 'Start Game', id: menuItemIds.startGame },
  { type: 'item', label: 'History', id: menuItemIds.history },
  { type: 'item', label: 'About', id: menuItemIds.about },
];

const MenuIcon = HeaderIcon(TiThMenu);

interface IMenuButtonProps {
  onStartGameSelect: () => void;
}

export default function MenuButton({
  onStartGameSelect,
}: IMenuButtonProps): JSX.Element {
  const router = useRouter();

  const menuItemClick = (itemId: string): void => {
    switch (itemId) {
      case menuItemIds.startGame:
        onStartGameSelect();
        break;
      case menuItemIds.history:
        router.push(ROUTES.history);
        break;
      case menuItemIds.about:
        router.push(ROUTES.about);
        break;
      default:
        console.warn(`Unhandled menu item ID: ${itemId}`);
    }
  };

  return (
    <DropdownButton
      buttonContent={<MenuIcon />}
      items={items}
      onItemClick={menuItemClick}
    />
  );
}
