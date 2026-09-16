/**
 * Renders the language selector used in the app settings dropdown.
 */
'use client';

import type { JSX } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { DropdownButton } from '@/components/ui/DropdownButton';
import type { IDropdownButtonItem } from '@/components/ui/Interfaces';

const items: IDropdownButtonItem[] = [
  { type: 'item', label: 'English', id: 'US' },
  { type: 'item', label: 'Portuguese', id: 'PT' },
  { type: 'item', label: 'Russian', id: 'RU' },
];

export default function LanguageSelector(): JSX.Element {
  const menuItemClick = (itemId: string): void => {
    console.log(`Clicked item with ID: ${itemId}`);
  };
  const buttonContent = <ReactCountryFlag countryCode="US" />;
  return (
    <DropdownButton
      buttonContent={buttonContent}
      items={items}
      onItemClick={menuItemClick}
    />
  );
}
