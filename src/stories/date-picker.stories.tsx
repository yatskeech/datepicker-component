import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { DatePicker } from '../ui/date-picker/date-picker';

const meta = {
  title: 'DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onChange: fn() },
  render: ({ date, defaultDate, onChange }) => (
    <DatePicker
      date={date && new Date(date)}
      defaultDate={defaultDate && new Date(defaultDate)}
      onChange={onChange}
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

export default meta;
