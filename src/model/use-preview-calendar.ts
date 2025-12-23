import { useMemo, useState } from 'react';

import {
  getDaysInMonth,
  getSurroundingMonthDates,
  isSameDay,
} from '../lib/date';
import { DAYS_IN_CALENDAR } from './constants';

type UsePreviewCalendarParams = {
  selectedDate?: Date | null;
};

export function usePreviewCalendar({ selectedDate }: UsePreviewCalendarParams) {
  const [previewDate] = useState(selectedDate ?? new Date());

  const previewDays = useMemo(() => {
    const [previousMonthDate, nextMonthDate] =
      getSurroundingMonthDates(previewDate);

    const currentMonthDaysCount = getDaysInMonth(previewDate);
    const previousMonthDaysCount = getDaysInMonth(previousMonthDate);

    const createDay = (date: Date, isDisabled?: boolean): DayState => ({
      date,
      isDisabled,
      isToday: isSameDay(date, new Date()),
      isSelected: !!selectedDate && isSameDay(date, selectedDate),
    });

    const currentMonthDays: DayState[] = Array.from(
      { length: currentMonthDaysCount },
      (_, i) =>
        createDay(
          new Date(previewDate.getFullYear(), previewDate.getMonth(), i + 1),
        ),
    );

    const previousMonthDays: DayState[] = Array.from(
      { length: currentMonthDays[0].date.getDate() - 1 },
      (_, i) =>
        createDay(
          new Date(
            previousMonthDate.getFullYear(),
            previousMonthDate.getMonth(),
            previousMonthDaysCount - i,
          ),
          true,
        ),
    ).reverse();

    const nextMonthDaysCount =
      DAYS_IN_CALENDAR - previousMonthDays.length - currentMonthDays.length;

    const nextMonthDays: DayState[] = Array.from(
      { length: nextMonthDaysCount },
      (_, i) =>
        createDay(
          new Date(
            nextMonthDate.getFullYear(),
            nextMonthDate.getMonth(),
            i + 1,
          ),
          true,
        ),
    );

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  }, [previewDate, selectedDate]);

  return { previewDays };
}
