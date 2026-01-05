import { useEffect, useRef } from 'react';

type UseDateInputParams = {
  date: Date | null;
  locale?: Intl.LocalesArgument;
};

export function useDateInput({ date, locale }: UseDateInputParams) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current || document.activeElement == inputRef.current) return;
    inputRef.current.value = date?.toLocaleDateString(locale) ?? '';
  }, [date, locale]);

  return { inputRef };
}
