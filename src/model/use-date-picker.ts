import { useEffect, useMemo, useState } from 'react';

import {
  getDaysInMonth,
  getSurroundingMonthDates,
  isSameDay,
} from '../lib/date';
import { DAYS_IN_CALENDAR } from './constants';

export type UseDatePickerParams = {
  date?: Date | null;
  onChange?: (date: Date | null) => void;
};

export function useDatePicker(params: UseDatePickerParams) {
  const { date, onChange } = params;

  const [selectedDate, setSelectedDate] = useState(date ?? null);
  const [previewDate, setPreviewDate] = useState(selectedDate ?? new Date());

  const previewDays = useMemo(() => {
    const [previousMonthDate, nextMonthDate] =
      getSurroundingMonthDates(previewDate);

    const currentMonthDaysCount = getDaysInMonth(previewDate);
    const previousMonthDaysCount = getDaysInMonth(previousMonthDate);

    const currentMonthDays: Day[] = Array.from(
      { length: currentMonthDaysCount },
      (_, i) => {
        const date = new Date(
          previewDate.getFullYear(),
          previewDate.getMonth(),
          i + 1,
        );

        return {
          date,
          isToday: isSameDay(date, new Date()),
          isSelected: !!selectedDate && isSameDay(date, selectedDate),
        };
      },
    );

    const previousMonthDays: Day[] = Array.from(
      { length: currentMonthDays[0].date.getDate() - 1 },
      (_, i) => {
        const date = new Date(
          previousMonthDate.getFullYear(),
          previousMonthDate.getMonth(),
          previousMonthDaysCount - i,
        );

        return {
          date,
          isToday: isSameDay(date, new Date()),
          isSelected: !!selectedDate && isSameDay(date, selectedDate),
          isDisabled: true,
        };
      },
    ).reverse();

    const nextMonthDaysCount =
      DAYS_IN_CALENDAR - previousMonthDays.length - currentMonthDays.length;

    const nextMonthDays: Day[] = Array.from(
      { length: nextMonthDaysCount },
      (_, i) => {
        const date = new Date(
          nextMonthDate.getFullYear(),
          nextMonthDate.getMonth(),
          i + 1,
        );

        return {
          date,
          isToday: isSameDay(date, new Date()),
          isSelected: !!selectedDate && isSameDay(date, selectedDate),
          isDisabled: true,
        };
      },
    );

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  }, [previewDate, selectedDate]);

  useEffect(() => {
    onChange?.(selectedDate);
  }, [selectedDate, onChange]);

  return {
    previewDays,
    selectedDate,
    onSelectedDateChange: setSelectedDate,
    previewDate,
    onPreviewDateChange: setPreviewDate,
  };
}
