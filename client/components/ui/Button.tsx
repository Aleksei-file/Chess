/**
 * Provides a reusable button component.
 */
'use client';

import type { JSX, ReactNode } from 'react';
import { Button as ReactButton } from '@base-ui/react/button';
import styles from './Button.module.scss';

interface IButtonProps {
  title: ReactNode;
  className?: string;
  onClick?: () => void;
}

function Button(props: IButtonProps): JSX.Element {
  return (
    <ReactButton
      className={`${styles.Button} ${props.className || ''}`.trim()}
      onClick={props.onClick}
    >
      {props.title}
    </ReactButton>
  );
}

export { Button, type IButtonProps };
