import { Meta, StoryObj } from '@storybook/react-webpack5';
import { TextArea, TextAreaProps } from '.';
import { within, userEvent } from '@storybook/testing-library';

const meta: Meta<TextAreaProps> = {
  title: 'components/Atoms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: { type: 'radio' },
      options: [4, 8],
    },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
    value: { control: false },
    onChange: { action: 'changed' },
    className: { control: false },
  },
};

export default meta;

type Story = StoryObj<TextAreaProps>;

const interactionPlay = async (canvasElement: HTMLElement, placeholder: string) => {
  const canvas = within(canvasElement);
  const textarea = canvas.getByPlaceholderText(placeholder) as HTMLTextAreaElement;
  textarea.focus();
  await userEvent.clear(textarea);
  await userEvent.type(textarea, 'Hello from Storybook');
};

export const Default: Story = {
  args: {
    placeholder: 'Enter your message here...',
  },
  play: async ({ canvasElement }) => interactionPlay(canvasElement, 'Enter your message here...'),
};

export const WithDefaultValue: Story = {
  args: {
    placeholder: 'Start typing...',
    defaultValue: 'This is a pre-filled text area.',
  },
  play: async ({ canvasElement }) => interactionPlay(canvasElement, 'Start typing...'),
};

export const ErrorState: Story = {
  args: {
    placeholder: 'Invalid content...',
    error: true,
  },
  play: async ({ canvasElement }) => interactionPlay(canvasElement, 'Invalid content...'),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled text area',
    disabled: true,
    defaultValue: 'This is disabled.',
  },
};

export const Rows8: Story = {
  args: {
    rows: 8,
    placeholder: 'Expanded text area with 8 rows',
  },
  play: async ({ canvasElement }) => interactionPlay(canvasElement, 'Expanded text area with 8 rows'),
};
