import {
  useDatePicker,
  type UseDatePickerParams,
} from '../model/use-date-picker';

type DatePickerProps = UseDatePickerParams;

export function DatePicker(props: DatePickerProps) {
  const { date, onChange } = props;
  const { previewDays } = useDatePicker({ date, onChange });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, auto)' }}>
      {previewDays.map((day) => (
        <div key={day.date.toISOString()}>{day.date.getDate()}</div>
      ))}
    </div>
  );
}
