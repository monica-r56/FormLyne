import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Accordion, AccordionItem } from '.';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNote, faVideo } from '@fortawesome/pro-regular-svg-icons';
import { accordionMessages } from './messages';
import { Dropdown } from '../Dropdowns';

type AccordionStoryProps = {
  label: string;
  status: string;
  iconPosition: 'left' | 'right';
  type: 'boxed' | 'divider';
  color: 'white' | 'blue';
  loading: boolean;
  dropdownProps?: React.ComponentProps<typeof Dropdown>;
};

const meta: Meta<AccordionStoryProps> = {
  title: 'components/molecules/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Secondary Camera',
    },
    type: {
      control: 'inline-radio',
      options: ['boxed', 'divider'],
    },
    color: {
      control: 'inline-radio',
      options: ['white', 'blue'],
    },
    status: {
      control: 'text',
      defaultValue: 'Status',
    },
    iconPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
    },
    loading: {
      control: 'inline-radio',
      options: [true, false],
    },
  },
};

export default meta;

type Story = StoryObj<AccordionStoryProps>;

const mockOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
];

const Template = (args: AccordionStoryProps) => (
  <Accordion type={args.type} color={args.color}>
    <AccordionItem
      id="item-1"
      label={args.label}
      status={args.status}
      icon={<FontAwesomeIcon icon={faNote} />}
      iconPosition={args.iconPosition}
      statusColor="green"
      dropdownProps={args.dropdownProps}
      loading={args.loading}
    >
      <div className="flex h-[100px] w-full items-center justify-center">
        <FormattedMessage {...accordionMessages.item1Content} />
      </div>
    </AccordionItem>
  </Accordion>
);

export const Default: Story = {
  render: Template,
  args: {
    label: 'Secondary Camera',
    status: 'Status',
    iconPosition: 'left',
    type: 'divider',
    color: 'white',
    loading: false,
  },
};

export const CustomComponent: Story = {
  render: Template,
  args: {
    label: 'Secondary Camera',
    status: 'Status',
    iconPosition: 'left',
    type: 'divider',
    color: 'white',
    loading: false,
  },
};

export const WithDropdowns: Story = {
  render: Template,
  args: {
    label: 'Secondary Camera',
    status: 'Status',
    iconPosition: 'left',
    type: 'divider',
    color: 'white',
    dropdownProps: {
      icon: <FontAwesomeIcon icon={faVideo} />,
      options: mockOptions,
      placeholder: 'Select Camera',
    },
  },
};
