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
