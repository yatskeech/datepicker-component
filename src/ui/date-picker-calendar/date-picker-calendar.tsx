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
  const { previewDate, weeks, rowStyles, onPrevMonth, onNextMonth } =
    usePreviewCalendar({ selectedDate, range });

  const handleCellClick = (date: Date) => {
    onSelectDate(date);
    onToggleCalendar(false);
  };

  return (
    <div role="dialog" aria-label="Calendar" className={styles.calendar}>
      <DateControls
        previewDate={previewDate}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
      />
      <div role="grid" className={styles.grid}>
        <div role="row" style={rowStyles}>
          {DAYS_OF_WEEK.map((weekday) => (
            <CellItem key={weekday} role="gridcell" className={styles.header}>
              {weekday.slice(0, 2)}
            </CellItem>
          ))}
        </div>
        {weeks.map((week, index) => (
          <div key={index} role="row" style={rowStyles}>
            {week.map(({ date, isDisabled, isSelected, isToday }) => (
              <CellItem
                key={date.getTime()}
                role="gridcell"
                aria-selected={isSelected}
                aria-disabled={isDisabled}
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
        ))}
      </div>
    </div>
  );
}
