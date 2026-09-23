/**
 * Renders the language selector used in the app settings dropdown.
 */
'use client';

import type { JSX } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { DropdownButton } from '@/components/ui/DropdownButton';
import type { IDropdownButtonItem } from '@/components/ui/Interfaces';

type Language = 'en' | 'pt' | 'ru';

const flagCodes: Record<Language, string> = {
  en: 'US',
  pt: 'PT',
  ru: 'RU',
};

const flagComponent = (countryCode: string): JSX.Element => (
  <ReactCountryFlag countryCode={countryCode} svg />
);

const items: IDropdownButtonItem[] = [
  {
    type: 'item',
    label: 'English',
    id: flagCodes.en,
    component: flagComponent(flagCodes.en),
  },
  {
    type: 'item',
    label: 'Portuguese',
    id: flagCodes.pt,
    component: flagComponent(flagCodes.pt),
  },
  {
    type: 'item',
    label: 'Russian',
    id: flagCodes.ru,
    component: flagComponent(flagCodes.ru),
  },
];

export default function LanguageSelector(): JSX.Element {
  const menuItemClick = (itemId: string): void => {
    console.log(`Clicked item with ID: ${itemId}`);
  };
  const buttonContent = flagComponent(flagCodes.en);
  return (
    <DropdownButton
      buttonContent={buttonContent}
      items={items}
      onItemClick={menuItemClick}
    />
  );
}
