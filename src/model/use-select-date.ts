import { useState } from 'react';

export type UseSelectDateParams = {
  date?: Date | null;
  defaultDate?: Date | null;
  onChange?: (date: Date | null) => void;
};

export function useSelectDate(params: UseSelectDateParams) {
  const { date, defaultDate = null, onChange } = params;

  const isControlled = date !== undefined;
  const [internalDate, setInternalDate] = useState(defaultDate);

  const selectDate = (date: Date | null) => {
    if (!isControlled) {
      setInternalDate(date);
    }

    onChange?.(date);
  };

  return { date: isControlled ? date : internalDate, selectDate };
}
