/**
 * Renders the language selector used in the app settings dropdown.
 */
'use client';

import { useTransition, useMemo, type ReactNode, type JSX } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { TiAdjustBrightness, TiArrowSortedDown } from 'react-icons/ti';
import type { IconBaseProps } from 'react-icons';
import { DropdownButton } from '@/components/ui/DropdownButton';
import type { IDropdownButtonItem } from '@/components/ui/Interfaces';
import { themes, type Theme } from '@/themes/constants';
import { getTheme, setTheme } from '@/themes/actions';
import styles from './ThemeSelector.module.scss';

const ThemeIcon = (props: IconBaseProps): JSX.Element => (
  <TiAdjustBrightness
    className={`${styles.Icon} ${props.className || ''}`.trim()}
  />
);

const selectableThemeIcon = (themeId: Theme): JSX.Element => (
  <ThemeIcon className={styles[`Icon-${themeId}`]} />
);

const selectorIcons = (): ReactNode => (
  <>
    <ThemeIcon className={styles['Icon-selected']} />
    <TiArrowSortedDown />
  </>
);

export default function ThemeSelector(): JSX.Element {
  const t = useTranslations();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const items: IDropdownButtonItem<Theme>[] =
    useMemo((): IDropdownButtonItem<Theme>[] => {
      const res: IDropdownButtonItem<Theme>[] = [];
      themes.forEach((themeId: Theme): void => {
        res.push({
          type: 'item',
          label: t(`themes.${themeId}`),
          id: themeId,
          component: selectableThemeIcon(themeId),
        });
      });
      return res;
    }, [t]);

  const menuItemClick = (selectedTheme: Theme): void => {
    startTransition(async (): Promise<void> => {
      const currentTheme = await getTheme();
      if (currentTheme !== selectedTheme) {
        await setTheme(selectedTheme);
        router.refresh();
      }
    });
  };

  return (
    <DropdownButton
      buttonContent={selectorIcons()}
      items={items}
      onItemClick={menuItemClick}
    />
  );
}
