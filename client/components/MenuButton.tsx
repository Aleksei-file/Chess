/**
 * Renders the primary navigation trigger for the header menu.
 */
'use client';

import type { JSX } from 'react';
import { TiThMenu } from 'react-icons/ti';
import HeaderIcon from '@/components/HeaderIcon';
import { DropdownButton } from '@/components/ui/DropdownButton';
import type { IDropdownButtonItem } from '@/components/ui/Interfaces';

const items: IDropdownButtonItem[] = [
  { type: 'item', label: 'Start Game', id: 'startGame' },
  { type: 'item', label: 'History', id: 'history' },
  { type: 'item', label: 'About', id: 'about' },
];

const MenuIcon = HeaderIcon(TiThMenu);

export default function MenuButton(): JSX.Element {
  const menuItemClick = (itemId: string): void => {
    console.log(`Clicked item with ID: ${itemId}`);
  };
  return (
    <DropdownButton
      buttonContent={<MenuIcon />}
      items={items}
      onItemClick={menuItemClick}
    />
  );
}
