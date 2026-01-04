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
  const [previewDate, setPreviewDate] = useState(selectedDate ?? new Date());

  const onPrevMonth = () => {
    setPreviewDate((previewDate) => {
      return new Date(previewDate.getFullYear(), previewDate.getMonth() - 1);
    });
  };

  const onNextMonth = () => {
    setPreviewDate((previewDate) => {
      return new Date(previewDate.getFullYear(), previewDate.getMonth() + 1);
    });
  };

  const previewDays = useMemo(() => {
    const [previousMonthDate, nextMonthDate] =
      getSurroundingMonthDates(previewDate);

    const previousMonthDaysCount = getDaysInMonth(previousMonthDate);
    const currentMonthDaysCount = getDaysInMonth(previewDate);

    const createDay = (
      dayStateParams: Pick<DayState, 'date' | 'isDisabled'>,
    ): DayState => {
      const { date, isDisabled = false } = dayStateParams;
      const isToday = isSameDay(date, new Date());
      const isSelected = !!selectedDate && isSameDay(date, selectedDate);
      return { date, isDisabled, isToday, isSelected };
    };

    const currentMonthDays: DayState[] = Array.from(
      { length: currentMonthDaysCount },
      (_, i) =>
        createDay({
          date: new Date(
            previewDate.getFullYear(),
            previewDate.getMonth(),
            i + 1,
          ),
        }),
    );

    const previousMonthDays: DayState[] = Array.from(
      { length: (currentMonthDays[0].date.getDay() + 6) % 7 },
      (_, i) =>
        createDay({
          date: new Date(
            previousMonthDate.getFullYear(),
            previousMonthDate.getMonth(),
            previousMonthDaysCount - i,
          ),
          isDisabled: true,
        }),
    ).reverse();

    const nextMonthDaysCount =
      DAYS_IN_CALENDAR - previousMonthDays.length - currentMonthDays.length;

    const nextMonthDays: DayState[] = Array.from(
      { length: nextMonthDaysCount },
      (_, i) =>
        createDay({
          date: new Date(
            nextMonthDate.getFullYear(),
            nextMonthDate.getMonth(),
            i + 1,
          ),
          isDisabled: true,
        }),
    );

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  }, [previewDate, selectedDate]);

  return { previewDate, previewDays, onPrevMonth, onNextMonth };
}
