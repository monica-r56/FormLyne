import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import DescriptionEditor from './index';
import { IntlProvider } from 'react-intl';

const messages = {};

const meta: Meta<typeof DescriptionEditor> = {
  title: 'Components/Issue/Description',
  component: DescriptionEditor,
  decorators: [
    (Story) => (
      <IntlProvider locale="en" messages={messages}>
        <div style={{ maxWidth: '100%', margin: '1rem auto', padding: '1rem' }}>
          <Story />
        </div>
      </IntlProvider>
    ),
  ],
  tags:['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for container',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DescriptionEditor>;

export const Default: Story = {
  render: (args) => {
    const [content, setContent] = useState('');

    return (
      <>
        <DescriptionEditor
          {...args}
          onChange={(htmlContent) => {
            setContent(htmlContent);
            args.onChange?.(htmlContent);
          }}
        />
        {/* <section
          style={{
            marginTop: '1rem',
            fontSize: 12,
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            backgroundColor: '#f0f0f0',
            padding: '0.5rem',
            borderRadius: '4px',
            maxHeight: '150px',
            // overflowY: 'auto',
          }}
        >
          {/* <strong>Serialized block content (JSON):</strong>
          <pre>{content || '(Type in the editor above to see content here)'}</pre> */}
        {/* </section> */} 
      </>
    );
  },
  args: {
    className: '',
  },
};
