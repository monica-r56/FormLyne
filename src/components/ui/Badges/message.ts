import { defineMessages, MessageDescriptor } from 'react-intl';

const messages = defineMessages({
  badgeContent99Plus: {
    id: 'Badge.content.99plus',
    defaultMessage: '99+',
  },
  badgeNew: {
    id: 'Badge.content.new',
    defaultMessage: 'New',
  },
  badgeLoading: {
    id: 'Badge.loading',
    defaultMessage: 'Loading',
  },
  badgeButtonCTA: {
    id: 'Badge.button.cta',
    defaultMessage: 'Button CTA',
  },
  badgeStarIcon: {
    id: 'Badge.icon.star',
    defaultMessage: '⭐',
  },
  badgeariaLabel: {
    id: 'Badge.ariaLabel',
    defaultMessage: 'Badge',
  },
});

export type MessagesType = Record<keyof typeof messages, MessageDescriptor>;

export default messages;
