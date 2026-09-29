/**
 * Provides a reusable scroll container with a themed, overlay-style scrollbar
 * that floats above the content instead of reserving layout width.
 */
'use client';

import type { JSX, ReactNode } from 'react';
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import styles from './ScrollArea.module.scss';

interface IScrollAreaProps {
  children?: ReactNode;
  className?: string;
  viewportClassName?: string;
}

function ScrollArea({
  children,
  className,
  viewportClassName,
}: IScrollAreaProps): JSX.Element {
  return (
    <BaseScrollArea.Root className={`${styles.Root} ${className || ''}`.trim()}>
      <BaseScrollArea.Viewport
        className={`${styles.Viewport} ${viewportClassName || ''}`.trim()}
      >
        <BaseScrollArea.Content className={styles.Content}>
          {children}
        </BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar
        orientation="vertical"
        className={styles.Scrollbar}
      >
        <BaseScrollArea.Thumb className={styles.Thumb} />
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  );
}

export { ScrollArea, type IScrollAreaProps };
