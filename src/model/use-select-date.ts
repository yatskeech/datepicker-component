import { useState } from 'react';

export type UseSelectDateParams = {
  date?: Date | null;
  defaultDate?: Date | null;
  onChange?: (date: Date | null) => void;
  range?: { min?: Date; max?: Date };
};

export function useSelectDate(params: UseSelectDateParams) {
  const { range, date, defaultDate = null, onChange } = params;

  const isControlled = date !== undefined;
  const [internalDate, setInternalDate] = useState(defaultDate);

  const selectDate = (date: Date | null) => {
    if (date && range?.max && date > range.max) return;
    if (date && range?.min && date < range.min) return;

    if (!isControlled) {
      setInternalDate(date);
    }

    onChange?.(date);
  };

  return { selectedDate: isControlled ? date : internalDate, selectDate };
}
