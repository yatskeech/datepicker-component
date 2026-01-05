export const getDaysInMonth = (date: Date) => {
  const lastDayDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return lastDayDate.getDate();
};

export const getSurroundingMonthDates = (date: Date) => {
  const previousMonthDate = new Date(date.getFullYear(), date.getMonth() - 1);
  const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1);
  return [previousMonthDate, nextMonthDate];
};

export const isSameDay = (...dates: Date[]) => {
  return dates.every(
    (date) =>
      date.getDate() === dates[0].getDate() &&
      date.getMonth() === dates[0].getMonth() &&
      date.getFullYear() === dates[0].getFullYear(),
  );
};

export const parseDate = (
  inputDateString: string,
  locale?: Intl.LocalesArgument,
) => {
  const DATE_PARTS = { YEAR: 2023, MONTH: 11, DAY: 25 };
  const { YEAR, MONTH, DAY } = DATE_PARTS;
  const defaultDate = new Date(YEAR, MONTH - 1, DAY);
  const formattedDate = defaultDate.toLocaleDateString(locale);
  const divider = formattedDate.match(/\D/)?.[0];

  if (!divider) return null;

  const formatParts: (keyof typeof DATE_PARTS)[] = formattedDate
    .split(divider)
    .map((part) => {
      switch (Number(part)) {
        case YEAR:
          return 'YEAR';
        case MONTH:
          return 'MONTH';
        case DAY:
          return 'DAY';
      }
    })
    .filter((part) => part !== undefined);

  const dateParts = inputDateString.split(divider).reduce(
    (parts, value, i) => {
      parts[formatParts[i] as keyof typeof DATE_PARTS] = Number(value);
      return parts;
    },
    {} as Record<keyof typeof DATE_PARTS, number>,
  );

  const parsedDate = new Date(
    dateParts.YEAR,
    dateParts.MONTH - 1,
    dateParts.DAY,
  );
  const validDay = parsedDate.getDate() === dateParts.DAY;
  const validMonth = parsedDate.getMonth() === dateParts.MONTH - 1;
  const validYear = parsedDate.getFullYear() === dateParts.YEAR;

  if (!validDay || !validMonth || !validYear) return null;

  return new Date(dateParts.YEAR, dateParts.MONTH - 1, dateParts.DAY);
};
