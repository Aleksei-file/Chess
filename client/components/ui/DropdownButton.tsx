/**
 * Provides a reusable dropdown menu component for app actions and settings.
 */
'use client';

import type { JSX, ReactNode } from 'react';
import { Menu } from '@base-ui/react/menu';
import styles from './DropdownButton.module.scss';

interface IDropdownButtonItem {
  type: 'item' | 'separator';
  label: string;
  id: string;
  component?: JSX.Element;
}

interface IDropdownButtonProps {
  buttonContent: ReactNode;
  items: IDropdownButtonItem[];
  onItemClick?: (itemId: string) => void;
}

function DropdownButton({
  buttonContent,
  items,
  onItemClick,
}: IDropdownButtonProps): JSX.Element {
  return (
    <Menu.Root>
      <Menu.Trigger className={styles.Button}>{buttonContent}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className={styles.Positioner} align="start">
          <Menu.Popup className={styles.Popup}>
            {items.map((item): JSX.Element =>
              item.type === 'separator' ? (
                <Menu.Separator key={item.id} className={styles.Separator} />
              ) : (
                <Menu.Item
                  key={item.id}
                  className={styles.Item}
                  onClick={(): void => onItemClick?.(item.id)}
                >
                  <span>{item.label}</span>
                  {item.component && (
                    <div
                      className="ml-4"
                      onClick={(e): void => e.stopPropagation()}
                    >
                      {item.component}
                    </div>
                  )}
                </Menu.Item>
              )
            )}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

export { DropdownButton, type IDropdownButtonItem, type IDropdownButtonProps };
