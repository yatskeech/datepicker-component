import type { Meta, StoryObj } from '@storybook/react-vite';

import { DatePicker } from './date-picker';

const meta = {
  title: 'DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
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

export default meta;
