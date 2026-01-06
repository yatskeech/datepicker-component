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

export function DatePicker(props: DatePickerProps) {
  const { date, defaultDate, range, locale, onChange } = props;
  const { refs, isOpen, setIsOpen, getReferenceProps, getFloatingProps } =
    usePopover();
  const { selectedDate, selectDate } = useSelectDate({
    date,
    defaultDate,
    range,
    onChange,
  });

  return (
    <>
      <div
        ref={(node) => refs.setReference(node)}
        {...getReferenceProps()}
        className={styles.variables}
      >
        <DatePickerInput
          selectedDate={selectedDate}
          onSelectDate={selectDate}
          onToggleCalendar={setIsOpen}
          locale={locale}
          range={range}
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
              key={selectedDate?.toLocaleDateString()}
              selectedDate={selectedDate}
              onSelectDate={selectDate}
              onToggleCalendar={setIsOpen}
              range={range}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
