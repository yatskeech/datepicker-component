import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { DatePicker } from '../ui/date-picker/date-picker';

const meta = {
  title: 'DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onChange: fn() },
  render: ({ date, defaultDate, ...rest }) => (
    <DatePicker
      date={date && new Date(date)}
      defaultDate={defaultDate && new Date(defaultDate)}
      {...rest}
    />
  ),
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

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
