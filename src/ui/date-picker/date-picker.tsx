import { FloatingPortal } from '@floating-ui/react';

import { usePopover } from '../../model/use-popover';
import {
  useSelectDate,
  type UseSelectDateParams,
} from '../../model/use-select-date';
import { DatePickerCalendar } from '../date-picker-calendar/date-picker-calendar';
import { DatePickerInput } from '../date-picker-input/date-picker-input';
import styles from './date-picker.module.css';

type DatePickerProps = UseSelectDateParams & {
  locale?: Intl.LocalesArgument;
};

export function DatePicker({ locale, ...rest }: DatePickerProps) {
  const { refs, isOpen, setIsOpen, getReferenceProps, getFloatingProps } =
    usePopover();
  const { date, selectDate } = useSelectDate(rest);

  return (
    <>
      <div
        ref={(node) => refs.setReference(node)}
        {...getReferenceProps()}
        className={styles.variables}
      >
        <DatePickerInput
          date={date}
          onSelectDate={selectDate}
          onToggleCalendar={setIsOpen}
          locale={locale}
        />
      </div>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={(node) => refs.setFloating(node)}
            {...getFloatingProps()}
            className={styles.variables}
          >
            <DatePickerCalendar
              key={date?.toLocaleDateString()}
              date={date}
              onSelectDate={selectDate}
              onToggleCalendar={setIsOpen}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
