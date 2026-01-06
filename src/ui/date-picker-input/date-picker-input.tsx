import { type ChangeEvent, type FocusEvent, type KeyboardEvent } from 'react';

import { parseDate } from '../../lib/date';
import { useDateInput } from '../../model/use-date-input';
import { Icon } from '../icon';
import styles from './date-picker-input.module.css';

type DatePickerInputProps = {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
  onToggleCalendar: (isOpen: boolean) => void;
  range?: { min?: Date; max?: Date };
  locale?: Intl.LocalesArgument;
};

export function DatePickerInput(props: DatePickerInputProps) {
  const { selectedDate, onSelectDate, onToggleCalendar, locale, range } = props;
  const { inputRef } = useDateInput({ date: selectedDate, locale });

  const handleClearDate = () => {
    onToggleCalendar(false);
    onSelectDate(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return onSelectDate(null);
    const inputDate = parseDate(e.target.value, locale);
    if (!inputDate) return;
    onSelectDate(inputDate);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) return onSelectDate(null);
    const inputDate = parseDate(e.target.value, locale);

    if (!inputDate) {
      e.target.value = selectedDate?.toLocaleDateString(locale) ?? '';
      return;
    }

    const isLessThanMin = range?.min && inputDate < range.min;
    const isMoreThanMax = range?.max && inputDate > range.max;

    if (isLessThanMin || isMoreThanMax) {
      e.target.value = selectedDate?.toLocaleDateString(locale) ?? '';
      return;
    }

    onSelectDate(inputDate);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    onToggleCalendar(false);
    e.currentTarget.blur();
  };

  return (
    <div className={styles.inputWrapper}>
      <Icon name="calendar" className={styles.calendarIcon} />
      <input
        type="text"
        ref={inputRef}
        placeholder="Choose Date"
        className={styles.input}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      {props.selectedDate && (
        <button
          aria-label="Clear date"
          className={styles.closeButton}
          onClick={handleClearDate}
        >
          <Icon name="close" />
        </button>
      )}
    </div>
  );
}
