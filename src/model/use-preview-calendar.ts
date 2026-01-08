import { type CSSProperties, useMemo, useState } from 'react';

import {
  getDaysInMonth,
  getSurroundingMonthDates,
  isSameDay,
} from '../lib/date';
import { DAYS_IN_CALENDAR, DAYS_IN_WEEK, WEEKS_IN_CALENDAR } from './constants';

type UsePreviewCalendarParams = {
  selectedDate?: Date | null;
  range?: { min?: Date; max?: Date };
};

export function usePreviewCalendar(params: UsePreviewCalendarParams) {
  const { selectedDate, range } = params;
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
      const isLessThanMin = range?.min && date < range.min;
      const isMoreThanMax = range?.max && date > range.max;
      const isToday = isSameDay(date, new Date());
      const isSelected = !!selectedDate && isSameDay(date, selectedDate);

      return {
        date,
        isDisabled: isDisabled || isLessThanMin || isMoreThanMax,
        isToday,
        isSelected,
      };
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
  }, [previewDate, selectedDate, range]);

  const weeks = useMemo(
    () =>
      Array.from({ length: WEEKS_IN_CALENDAR }).map((_, i) =>
        previewDays.slice(i * DAYS_IN_WEEK, (i + 1) * DAYS_IN_WEEK),
      ),
    [previewDays],
  );

  const rowStyles: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${DAYS_IN_WEEK}, auto)`,
  };

  return { previewDate, weeks, rowStyles, onPrevMonth, onNextMonth };
}
