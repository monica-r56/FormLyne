import { Meta, StoryObj } from '@storybook/react-webpack5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { within, userEvent } from '@storybook/testing-library';
import { Input, InputProps } from '.';

const meta: Meta<typeof Input> = {
  title: 'components/Atoms/Input',
  component: Input,
  argTypes: {
    placeholder: { control: 'text' },
    error: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
    disabled: { control: 'boolean' },
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onClear: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    type: { control: { type: 'select', options: ['text', 'password'] } },
  },
};

export default meta;

type Story = StoryObj<InputProps>;

const interactionPlay = async (canvasElement: HTMLElement, placeholder: string) => {
  const canvas = within(canvasElement);
  const input = canvas.getByPlaceholderText(placeholder) as HTMLInputElement;
  input.focus();
  await userEvent.type(input, 'Hello');
  const clearButton = canvas.queryByRole('button');
  if (clearButton) {
    await userEvent.click(clearButton);
  }
};

export const Default: Story = {
  args: {
    placeholder: 'Enter some text',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => interactionPlay(canvasElement, 'Enter some text'),
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search',
    leftIcon: <FontAwesomeIcon icon={faSearch} />,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => interactionPlay(canvasElement, 'Search'),
};

export const WithRightIcon: Story = {
  args: {
    placeholder: 'Enter',
    rightIcon: <FontAwesomeIcon icon={faCalendar} />,
    showClearButton: false,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => interactionPlay(canvasElement, 'Enter'),
};

export const WithBothIcon: Story = {
  args: {
    placeholder: 'Date',
    leftIcon: <FontAwesomeIcon icon={faCalendar} />,
    rightIcon: <FontAwesomeIcon icon={faChevronDown} />,
    showClearButton: false,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => interactionPlay(canvasElement, 'Date'),
};

export const Clearable: Story = {
  args: {
    placeholder: 'Enter',
    showClearButton: true,
    defaultValue: 'Hello',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => interactionPlay(canvasElement, 'Enter'),
};

export const Password: Story = {
  args: {
    placeholder: 'Enter your password',
    type: 'password',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Enter your password') as HTMLInputElement;
    if (input.type === 'password') {
      await userEvent.type(input, 'Secret123');
      const toggleButton = canvas.getByRole('button');
      await userEvent.click(toggleButton);
    }
  },
};

export const ErrorState: Story = {
  args: {
    placeholder: 'Something went wrong',
    error: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) =>
    interactionPlay(canvasElement, 'Something went wrong'),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Input is disabled',
    disabled: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Input is disabled');
    await userEvent.type(input, 'Should not type');
  },
};
