import { type ChangeEvent, type FocusEvent, type KeyboardEvent } from 'react';

import { parseDate } from '../../lib/date';
import { useDateInput } from '../../model/use-date-input';
import { Icon } from '../icon';
import styles from './date-picker-input.module.css';

type DatePickerInputProps = {
  date: Date | null;
  onSelectDate: (date: Date | null) => void;
  onTogglePicker: (isOpen: boolean) => void;
  locale?: Intl.LocalesArgument;
};

export function DatePickerInput(props: DatePickerInputProps) {
  const { date, onSelectDate, onTogglePicker, locale } = props;
  const { inputRef, focusInput, blurInput } = useDateInput({ date, locale });

  const handleOpenCalendar = () => {
    onTogglePicker(true);
    focusInput();
  };

  const handleClearDate = () => {
    onTogglePicker(false);
    onSelectDate(null);
    blurInput();
  };

  const handleFocus = () => {
    onTogglePicker(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputDate = parseDate(e.target.value, locale);
    if (!inputDate) return;
    onSelectDate(inputDate);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const inputDate = parseDate(e.target.value, locale);
    if (inputDate) return onSelectDate(inputDate);
    e.target.value = date?.toLocaleDateString(locale) ?? '';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    onTogglePicker(false);
    e.currentTarget.blur();
  };

  return (
    <div className={styles.inputWrapper}>
      <button
        aria-label="Open calendar"
        className={styles.calendarButton}
        onClick={handleOpenCalendar}
      >
        <Icon name="calendar" />
      </button>
      <input
        type="text"
        ref={inputRef}
        placeholder="Choose Date"
        className={styles.input}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      {props.date && (
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
