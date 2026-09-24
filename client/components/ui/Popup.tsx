/**
 * Provides a reusable modal popup with customizable content for app dialogs.
 */
'use client';

import type { JSX, ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import styles from './Popup.module.scss';

interface IPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children?: ReactNode;
}

function Popup({
  open,
  onOpenChange,
  title,
  children,
}: IPopupProps): JSX.Element {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Popup className={styles.Popup}>
          <Dialog.Close className={styles.Close} aria-label="Close">
            {'×'}
          </Dialog.Close>
          {title && (
            <Dialog.Title className={styles.Title}>{title}</Dialog.Title>
          )}
          <div className={styles.Content}>{children}</div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { Popup, type IPopupProps };
