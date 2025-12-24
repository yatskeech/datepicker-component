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
      <PrevMonthButton onClick={onPrevMonth} />
      <span className={styles.title}>
        {previewDate.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </span>
      <NextMonthButton onClick={onNextMonth} />
    </div>
  );
}

function PrevMonthButton({ onClick }: { onClick?: () => void }) {
  return (
    <button className={styles.button} onClick={onClick}>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M11.7267 12L12.6667 11.06L9.61333 8L12.6667 4.94L11.7267 4L7.72667 8L11.7267 12Z"
          fill="currentColor"
        />
        <path
          d="M7.33332 12L8.27332 11.06L5.21998 8L8.27332 4.94L7.33332 4L3.33332 8L7.33332 12Z"
          fill="currentColor"
        />
      </svg>
      <span className="sr-only">Previous month</span>
    </button>
  );
}

function NextMonthButton({ onClick }: { onClick?: () => void }) {
  return (
    <button className={styles.button} onClick={onClick}>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M4.27325 4L3.33325 4.94L6.38659 8L3.33325 11.06L4.27325 12L8.27325 8L4.27325 4Z"
          fill="currentColor"
        />
        <path
          d="M8.66656 4L7.72656 4.94L10.7799 8L7.72656 11.06L8.66656 12L12.6666 8L8.66656 4Z"
          fill="currentColor"
        />
      </svg>
      <span className="sr-only">Next month</span>
    </button>
  );
}
