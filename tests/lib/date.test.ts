import {
  getDaysInMonth,
  getSurroundingMonthDates,
  isSameDay,
  parseDate,
} from '../../src/lib/date';

describe('date utilities', () => {
  describe('getDaysInMonth', () => {
    it.each([
      [new Date(2024, 1, 15), 29],
      [new Date(2025, 1, 10), 28],
      [new Date(2025, 0, 1), 31],
      [new Date(2024, 11, 20), 31],
    ])('getDaysInMonth(%j) should return %i', (date, expected) => {
      expect(getDaysInMonth(date)).toBe(expected);
    });
  });

  describe('getSurroundingMonthDates', () => {
    it.each([
      [new Date(2025, 0, 15), [new Date(2024, 11, 1), new Date(2025, 1, 1)]],
      [new Date(2025, 11, 10), [new Date(2025, 10, 1), new Date(2026, 0, 1)]],
      [new Date(2025, 5, 10), [new Date(2025, 4, 1), new Date(2025, 6, 1)]],
      [new Date(2025, 8, 26), [new Date(2025, 7, 1), new Date(2025, 9, 1)]],
    ])('getSurroundingMonthDates(%j) should return %j', (date, expected) => {
      expect(getSurroundingMonthDates(date)).toEqual(expected);
    });
  });

  describe('isSameDay', () => {
    it.each([
      [[new Date(2025, 5, 15), new Date(2025, 5, 15)], true],
      [[new Date(2026, 5, 15), new Date(2024, 5, 15)], false],
      [[new Date(2025, 6, 15), new Date(2024, 5, 15)], false],
      [[new Date(2025, 5, 16), new Date(2024, 5, 15)], false],
    ])('isSameDay(%j) should return %s', (dates, expected) => {
      expect(isSameDay(...dates)).toBe(expected);
    });
  });

  describe('parseDate', () => {
    it.each([
      ['31.01.2026', 'ru-RU', new Date(2026, 0, 31)],
      ['01/31/2026', 'en-EN', new Date(2026, 0, 31)],
      ['2026-01-31', 'sv-SE', new Date(2026, 0, 31)],
      ['01/31/2026', undefined, new Date(2026, 0, 31)],
      ['31.01.2026', undefined, null],
    ])(
      'parseDate(%j, %j) should return %j',
      (inputDateString, locale, expected) => {
        expect(parseDate(inputDateString, locale)).toEqual(expected);
      },
    );
  });
});
