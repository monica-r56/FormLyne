import { Meta, StoryObj } from '@storybook/react-webpack5';
import Card from '.';

const meta: Meta<typeof Card> = {
  title: 'components/Atoms/CardDiagnostics',
  component: Card,
  tags: ['autodocs'],
  args: {
    label: 'Did you hear the test sound ? Confirm if you heard it',
    buttonLabel: 'Yes , I heard',
    className: '',
    buttonProps: {
      onClick: () => alert('Button Clicked'),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};
