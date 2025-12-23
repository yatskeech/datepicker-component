import { usePreviewCalendar } from '../../model/use-preview-calendar';
import {
  useSelectDate,
  type UseSelectDateParams,
} from '../../model/use-select-date';
import { DayItem } from '../day-item/day-item';
import styles from './date-picker.module.css';

type DatePickerProps = UseSelectDateParams;

export function DatePicker(props: DatePickerProps) {
  const { date, onSelectDate } = useSelectDate(props);
  const { previewDays } = usePreviewCalendar({ selectedDate: date });

  return (
    <div className={styles.picker}>
      {previewDays.map((day, index) => (
        <DayItem key={index} day={day} onSelect={onSelectDate} />
      ))}
    </div>
  );
}
