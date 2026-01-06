import { clsx } from 'clsx';

import { DAYS_OF_WEEK } from '../../model/constants';
import { usePreviewCalendar } from '../../model/use-preview-calendar';
import { CellItem } from '../cell-item/cell-item';
import { DateControls } from '../date-controls/date-controls';
import styles from './date-picker-calendar.module.css';

type DatePickerCalendarProps = {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
  onToggleCalendar: (isOpen: boolean) => void;
  range?: { min?: Date; max?: Date };
};

export function DatePickerCalendar(props: DatePickerCalendarProps) {
  const { selectedDate, range, onSelectDate, onToggleCalendar } = props;
  const { previewDate, previewDays, onPrevMonth, onNextMonth } =
    usePreviewCalendar({ selectedDate, range });

  const handleCellClick = (date: Date) => {
    onSelectDate(date);
    onToggleCalendar(false);
  };

  return (
    <div className={styles.popover}>
      <DateControls
        previewDate={previewDate}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
      />
      <div className={styles.grid}>
        {DAYS_OF_WEEK.map((weekday) => (
          <CellItem key={weekday} className={styles.header}>
            {weekday.slice(0, 2)}
          </CellItem>
        ))}
        {previewDays.map(({ date, isDisabled, isSelected, isToday }) => (
          <CellItem
            key={date.getTime()}
            onClick={() => handleCellClick(date)}
            disabled={isDisabled}
            className={clsx(styles.cell, {
              [styles.disabled]: isDisabled,
              [styles.selected]: isSelected,
              [styles.today]: isToday,
            })}
          >
            {date.getDate()}
          </CellItem>
        ))}
      </div>
    </div>
  );
}
