import { Meta, StoryObj } from '@storybook/react';
import IssueForm from '.';

const meta: Meta<typeof IssueForm> = {
  title: 'Components/Forms/IssueForm',
  component: IssueForm,
  parameters: {
    layout: 'centered',
  },
  tags:['autodocs']
};

export default meta;
type Story = StoryObj<typeof IssueForm>;

const Template = (colorScheme: 'light' | 'dark'): JSX.Element => (
      <IssueForm />
);

export const StaticForm: Story = {
  render: () => Template('light'),
};

