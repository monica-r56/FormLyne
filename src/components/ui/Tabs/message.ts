import { defineMessages, MessageDescriptor } from 'react-intl';

const messages = defineMessages({
  OverviewContent: {
    id: 'molecules.Tabs.content.overview',
    defaultMessage: 'overview Content',
  },
  SettingContent: {
    id: 'molecules.Tabs.content.setting',
    defaultMessage: 'Setting Content',
  },
});

export type MessagesType = Record<keyof typeof messages, MessageDescriptor>;

export default messages;
