import clsx from 'clsx';

import { DAYS_OF_WEEK } from '../../model/constants';
import { usePreviewCalendar } from '../../model/use-preview-calendar';
import {
  useSelectDate,
  type UseSelectDateParams,
} from '../../model/use-select-date';
import { CellItem } from '../cell-item/cell-item';
import { DateControls } from '../date-controls/date-controls';
import styles from './date-picker.module.css';

type DatePickerProps = UseSelectDateParams;

export function DatePicker(props: DatePickerProps) {
  const { date, onSelectDate } = useSelectDate(props);
  const { previewDate, previewDays, onPrevMonth, onNextMonth } =
    usePreviewCalendar({ selectedDate: date });

  return (
    <div className={styles.picker}>
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
            onClick={() => onSelectDate(date)}
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
