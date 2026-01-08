import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, screen, within } from 'storybook/test';

import { DatePicker } from '../src';

const meta = {
  title: 'DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  render: ({ date, defaultDate, ...rest }) => (
    <DatePicker
      date={date && new Date(date)}
      defaultDate={defaultDate && new Date(defaultDate)}
      {...rest}
    />
  ),
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof meta>;

export const OpenCalendar: Story = {
  play: async ({ canvas, userEvent, step }) => {
    await step('Open calendar', async () => {
      const input = canvas.getByPlaceholderText('Choose Date');
      await userEvent.click(input);
      const calendar = screen.getByRole('dialog', { name: 'Calendar' });
      await expect(calendar).toBeInTheDocument();
    });
  },
};

export const CloseOnOutsideClick: Story = {
  play: async ({ canvas, userEvent, step }) => {
    await step('Open calendar', async () => {
      const input = canvas.getByPlaceholderText('Choose Date');
      await userEvent.click(input);
      const calendar = screen.getByRole('dialog', { name: 'Calendar' });
      await expect(calendar).toBeInTheDocument();
    });

    await step('Click outside to close', async () => {
      await userEvent.click(document.body);
      const calendar = screen.queryByRole('dialog', { name: 'Calendar' });
      await expect(calendar).not.toBeInTheDocument();
    });
  },
};

export const SelectDateUsingInput: Story = {
  args: { onChange: fn() },
  play: async ({ args, canvas, userEvent, step }) => {
    const date = new Date(2026, 0, 15);
    const input = canvas.getByPlaceholderText('Choose Date');

    await step('Open calendar', async () => {
      await userEvent.click(input);
      const calendar = screen.getByRole('dialog', { name: 'Calendar' });
      await expect(calendar).toBeInTheDocument();
    });

    await step('Type date into input', async () => {
      await userEvent.type(input, date.toLocaleDateString(args.locale));
      const calendar = within(screen.getByRole('dialog', { name: 'Calendar' }));
      const activeCell = calendar.getByRole('gridcell', { selected: true });
      const heading = calendar.getByRole('heading', { level: 2 });
      await expect(activeCell).toHaveTextContent('15');
      await expect(heading).toHaveTextContent('January 2026');
      await expect(args.onChange).toHaveBeenCalledWith(date);
    });

    await step('Click outside to close', async () => {
      await userEvent.click(document.body);
      const calendar = screen.queryByRole('dialog', { name: 'Calendar' });
      await expect(calendar).not.toBeInTheDocument();
    });
  },
};

export const ResetDateUsingInput: Story = {
  args: { onChange: fn(), defaultDate: new Date(2026, 0, 15) },
  play: async ({ args, canvas, userEvent, step }) => {
    await step('Clear input to reset calendar', async () => {
      await userEvent.clear(canvas.getByPlaceholderText('Choose Date'));
      const calendar = screen.getByRole('dialog', { name: 'Calendar' });
      await expect(calendar).toBeInTheDocument();
      await expect(args.onChange).toHaveBeenCalledWith(null);
    });

    await step('Click outside to close', async () => {
      await userEvent.click(document.body);
      const calendar = screen.queryByRole('dialog', { name: 'Calendar' });
      await expect(calendar).not.toBeInTheDocument();
      await expect(args.onChange).toHaveBeenCalledOnce();
    });
  },
};

export const SelectDateUsingCalendar: Story = {
  args: { onChange: fn(), defaultDate: new Date(2026, 0, 1) },
  play: async ({ args, canvas, userEvent, step }) => {
    const date = new Date(2026, 0, 15);

    await step('Open calendar', async () => {
      await userEvent.click(canvas.getByPlaceholderText('Choose Date'));
      const calendar = screen.getByRole('dialog', { name: 'Calendar' });
      await expect(calendar).toBeInTheDocument();
    });

    await step('Select date from calendar', async () => {
      const calendarElement = screen.getByRole('dialog', { name: 'Calendar' });
      const calendar = within(calendarElement);
      await userEvent.click(
        calendar.getByRole('gridcell', { name: date.getDate().toString() }),
      );
      await expect(args.onChange).toHaveBeenCalledWith(date);
      await expect(calendarElement).not.toBeInTheDocument();
    });
  },
};

export const ResetDateUsingButton: Story = {
  args: { onChange: fn(), defaultDate: new Date(2026, 0, 15) },
  play: async ({ args, canvas, userEvent, step }) => {
    await step('Reset date using button', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Clear date' }));
      await expect(args.onChange).toHaveBeenCalledWith(null);
    });
  },
};

export const DateRangeInInput: Story = {
  args: {
    onChange: fn(),
    range: { min: new Date(2026, 0, 1), max: new Date(2026, 0, 31) },
  },
  play: async ({ args, canvas, userEvent, step }) => {
    const date = new Date(2026, 0, 15);
    const dateOutOfRange = new Date(2026, 1, 15);
    const input = canvas.getByPlaceholderText('Choose Date');

    await step('Type correct date into input', async () => {
      await userEvent.type(input, date.toLocaleDateString(args.locale));
      await expect(args.onChange).toHaveBeenCalledWith(date);
    });

    await step('Type incorrect date into input', async () => {
      await userEvent.clear(input);
      await userEvent.type(
        input,
        dateOutOfRange.toLocaleDateString(args.locale),
      );
      await expect(args.onChange).not.toHaveBeenCalledWith(dateOutOfRange);
    });
  },
};

export const DateRangeInCalendar: Story = {
  args: {
    onChange: fn(),
    defaultDate: new Date(2026, 0, 1),
    range: { min: new Date(2026, 0, 10), max: new Date(2026, 0, 31) },
  },
  play: async ({ args, canvas, userEvent, step }) => {
    const date = new Date(2026, 0, 15);
    const dateOutOfRange = new Date(2026, 0, 9);
    const input = canvas.getByPlaceholderText('Choose Date');

    await step('Open calendar', async () => {
      await userEvent.click(input);
      const calendar = screen.getByRole('dialog', { name: 'Calendar' });
      await expect(calendar).toBeInTheDocument();
    });

    await step('Select correct date from calendar', async () => {
      const calendarElement = screen.getByRole('dialog', { name: 'Calendar' });
      const calendar = within(calendarElement);
      await userEvent.click(
        calendar.getByRole('gridcell', { name: date.getDate().toString() }),
      );
      await expect(args.onChange).toHaveBeenCalledWith(date);
    });

    await step('Open calendar', async () => {
      await userEvent.click(input);
      const calendar = screen.getByRole('dialog', { name: 'Calendar' });
      await expect(calendar).toBeInTheDocument();
    });

    await step('Select incorrect date from calendar', async () => {
      const calendarElement = screen.getByRole('dialog', { name: 'Calendar' });
      const calendar = within(calendarElement);
      await userEvent.click(
        calendar.getByRole('gridcell', {
          name: dateOutOfRange.getDate().toString(),
        }),
      );
      await expect(args.onChange).not.toHaveBeenCalledWith(dateOutOfRange);
    });
  },
};

export const WithDefaultDate: Story = {
  args: { defaultDate: new Date() },
};

export const WithSelectedDate: Story = {
  args: { date: new Date() },
};

export const WithRange: Story = {
  args: {
    defaultDate: new Date(2026, 0, 15),
    range: { min: new Date(2026, 0, 1), max: new Date(2026, 0, 31) },
  },
};

export const WithSpecificLocale: Story = {
  args: { defaultDate: new Date(), locale: 'sv-SE' },
};

export default meta;
