import type { Meta, StoryObj } from '@storybook/react-vite';

import { DatePicker } from './date-picker';

const meta = {
  title: 'DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
