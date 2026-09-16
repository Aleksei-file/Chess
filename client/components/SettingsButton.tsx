/**
 * Provides the header settings menu with access to theme, language, and account options.
 */
'use client';

import type { JSX } from 'react';
import { TiCog } from 'react-icons/ti';
import { DropdownButton } from '@/components/ui/DropdownButton';
import LanguageSelector from '@/components/LanguageSelector';
import HeaderIcon from '@/components/HeaderIcon';
import type { IDropdownButtonItem } from '@/components/ui/Interfaces';

const items: IDropdownButtonItem[] = [
  { type: 'item', label: 'Theme', id: 'theme' },
  {
    type: 'item',
    label: 'Language',
    id: 'language',
    component: <LanguageSelector />,
  },
  { type: 'separator', label: '', id: 'separator1' },
  { type: 'item', label: 'Profile', id: 'profile' },
];

const SettingsIcon = HeaderIcon(TiCog);

export default function ExampleMenu(): JSX.Element {
  const menuItemClick = (itemId: string): void => {
    console.log(`Clicked item with ID: ${itemId}`);
  };
  return (
    <DropdownButton
      buttonContent={<SettingsIcon />}
      items={items}
      onItemClick={menuItemClick}
    />
  );
}
