import { clsx } from 'clsx';

import styles from './day-item.module.css';

type DayItemProps = {
  day: DayState;
  onSelect: (date: Date) => void;
};

export function DayItem({ day, onSelect }: DayItemProps) {
  return (
    <div
      className={clsx(styles.day, {
        [styles.disabled]: day.isDisabled,
        [styles.selected]: day.isSelected,
        [styles.today]: day.isToday,
      })}
      onClick={() => onSelect(day.date)}
    >
      {day.date.getDate()}
    </div>
  );
}
