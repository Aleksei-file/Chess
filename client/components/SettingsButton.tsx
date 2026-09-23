/**
 * Provides the header settings menu with access to theme, language, and account options.
 */
'use client';

import { useMemo, type JSX } from 'react';
import { useTranslations } from 'next-intl';
import { TiCog } from 'react-icons/ti';
import { DropdownButton } from '@/components/ui/DropdownButton';
import LanguageSelector from '@/components/LanguageSelector';
import HeaderIcon from '@/components/HeaderIcon';
import type { IDropdownButtonItem } from '@/components/ui/Interfaces';

const SettingsIcon = HeaderIcon(TiCog);

export default function ExampleMenu(): JSX.Element {
  const t = useTranslations();

  const items: IDropdownButtonItem<string>[] = useMemo(
    (): IDropdownButtonItem<string>[] => [
      { type: 'item', label: t('settings.theme'), id: 'theme' },
      {
        type: 'item',
        label: t('settings.language'),
        id: 'language',
        isMutedComponent: true,
        component: <LanguageSelector />,
      },
      { type: 'separator', label: '', id: 'separator1' },
      { type: 'item', label: t('settings.profile'), id: 'profile' },
    ],
    [t]
  );

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
