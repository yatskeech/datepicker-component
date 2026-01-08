import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

import styles from './cell-item.module.css';

type CellItemProps = ComponentPropsWithoutRef<'button'>;

export function CellItem(props: CellItemProps) {
  const { className, children, disabled, onClick, ...rest } = props;

  return (
    <button
      className={clsx(styles.cell, className)}
      disabled={disabled || onClick === undefined}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
