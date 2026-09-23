/**
 * Provides a reusable dropdown menu component for app actions and settings.
 */
'use client';
import type { JSX, ReactNode, MouseEvent } from 'react';
import { Menu } from '@base-ui/react/menu';
import styles from './DropdownButton.module.scss';

interface IDropdownButtonItem<T extends string> {
  type: 'item' | 'separator';
  label: string;
  id: T;
  component?: JSX.Element;
  isMutedComponent?: boolean;
}
interface IDropdownButtonProps<T extends string> {
  buttonContent: ReactNode;
  items: IDropdownButtonItem<T>[];
  onItemClick?: (itemId: T) => void;
}

function DropdownButton<T extends string>({
  buttonContent,
  items,
  onItemClick,
}: IDropdownButtonProps<T>): JSX.Element {
  return (
    <Menu.Root>
      <Menu.Trigger className={styles.Button}>{buttonContent}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className={styles.Positioner} align="start">
          <Menu.Popup className={styles.Popup}>
            {items.map((item: IDropdownButtonItem<T>): JSX.Element =>
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
                      onClick={(e: MouseEvent<HTMLDivElement>): void => {
                        item.isMutedComponent && e.stopPropagation();
                      }}
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
