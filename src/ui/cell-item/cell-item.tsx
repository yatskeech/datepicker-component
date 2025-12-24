import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import styles from './cell-item.module.css';

type CellItemProps = {
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export function CellItem(props: CellItemProps) {
  const { className, children, disabled, onClick } = props;

  return (
    <button
      className={clsx(styles.cell, className)}
      disabled={disabled || onClick === undefined}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
