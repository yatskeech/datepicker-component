import { usePopover } from '../../model/use-popover';
import {
  useSelectDate,
  type UseSelectDateParams,
} from '../../model/use-select-date';
import { DatePickerInput } from '../date-picker-input/date-picker-input';
import { DatePickerPopover } from '../date-picker-popover/date-picker-popover';
import styles from './date-picker.module.css';

type DatePickerProps = UseSelectDateParams & {
  locale?: Intl.LocalesArgument;
};

export function DatePicker({ locale, ...rest }: DatePickerProps) {
  const { date, selectDate } = useSelectDate(rest);
  const { isOpen, setIsOpen, handleInnerClick } = usePopover();

  return (
    <div className={styles.picker} onClick={handleInnerClick}>
      <DatePickerInput
        date={date}
        onSelectDate={selectDate}
        onTogglePicker={setIsOpen}
        locale={locale}
      />
      {isOpen && (
        <DatePickerPopover
          key={date?.toLocaleDateString()}
          date={date}
          onSelectDate={selectDate}
          onTogglePicker={setIsOpen}
        />
      )}
    </div>
  );
}
