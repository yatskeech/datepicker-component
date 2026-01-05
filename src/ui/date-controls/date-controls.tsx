import { Icon } from '../icon';
import styles from './date-controls.module.css';

type DateControlsProps = {
  previewDate: Date;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
};

export function DateControls(props: DateControlsProps) {
  const { previewDate, onPrevMonth, onNextMonth } = props;

  return (
    <div className={styles.controls}>
      <button
        className={styles.button}
        onClick={onPrevMonth}
        aria-label="Previous month"
      >
        <Icon name="prev" />
      </button>
      <span className={styles.title}>
        {previewDate.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </span>
      <button
        className={styles.button}
        onClick={onNextMonth}
        aria-label="Next month"
      >
        <Icon name="next" />
      </button>
    </div>
  );
}
