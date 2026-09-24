/**
 * Wraps header icons with the shared styling used across the app navigation.
 */
'use client';

import type { ComponentType, JSX } from 'react';
import styles from './HeaderIcon.module.scss';

type HeaderIconComponent = ComponentType<{ className?: string }>;

export default function HeaderIcon(
  Icon: HeaderIconComponent
): HeaderIconComponent {
  return function HeaderIconComponent({
    className,
  }: {
    className?: string;
  }): JSX.Element {
    return (
      <Icon className={`text-6xl ${styles.Icon} ${className ?? ''}`.trim()} />
    );
  };
}
