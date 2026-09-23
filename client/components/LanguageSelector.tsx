/**
 * Renders the language selector used in the app settings dropdown.
 */
'use client';

import { useTransition, useMemo, type ReactNode, type JSX } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import ReactCountryFlag from 'react-country-flag';
import { TiArrowSortedDown } from 'react-icons/ti';
import { DropdownButton } from '@/components/ui/DropdownButton';
import type { IDropdownButtonItem } from '@/components/ui/Interfaces';
import { setUserLocale } from '@/i18n/actions';
import type { Locale } from '@/i18n/locales';

type Language = Locale;

const flagCodes: Record<Language, string> = {
  en: 'US',
  pt: 'PT',
  ru: 'RU',
};

const flagComponent = (countryCode: string): JSX.Element => (
  <ReactCountryFlag countryCode={countryCode} svg />
);

const items: IDropdownButtonItem<Language>[] = [
  {
    type: 'item',
    label: 'English',
    id: 'en',
    component: flagComponent(flagCodes.en),
  },
  {
    type: 'item',
    label: 'Português',
    id: 'pt',
    component: flagComponent(flagCodes.pt),
  },
  {
    type: 'item',
    label: 'Русский',
    id: 'ru',
    component: flagComponent(flagCodes.ru),
  },
];

const selectorIcons = (flagCode: Language): ReactNode => (
  <>
    {flagComponent(flagCodes[flagCode])}
    <TiArrowSortedDown />
  </>
);

export default function LanguageSelector(): JSX.Element {
  const currentLanguage = useLocale() as Language;
  const router = useRouter();
  const [, startTransition] = useTransition();

  const menuItemClick = (itemId: Language): void => {
    startTransition(async (): Promise<void> => {
      await setUserLocale(itemId);
      router.refresh();
    });
  };

  const buttonContent = useMemo(
    (): ReactNode => selectorIcons(currentLanguage),
    [currentLanguage]
  );

  return (
    <DropdownButton
      buttonContent={buttonContent}
      items={items}
      onItemClick={menuItemClick}
    />
  );
}
