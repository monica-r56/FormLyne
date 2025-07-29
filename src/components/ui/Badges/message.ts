import { defineMessages, MessageDescriptor } from 'react-intl';

const messages = defineMessages({
  badgeContent99Plus: {
    id: 'atoms.Badge.content.99plus',
    defaultMessage: '99+',
  },
  badgeNew: {
    id: 'atoms.Badge.content.new',
    defaultMessage: 'New',
  },
  badgeLoading: {
    id: 'atoms.Badge.loading',
    defaultMessage: 'Loading',
  },
  badgeButtonCTA: {
    id: 'atoms.Badge.button.cta',
    defaultMessage: 'Button CTA',
  },
  badgeStarIcon: {
    id: 'atoms.Badge.icon.star',
    defaultMessage: '⭐',
  },
  badgeariaLabel: {
    id: 'atoms.Badge.ariaLabel',
    defaultMessage: 'Badge',
  },
});

export type MessagesType = Record<keyof typeof messages, MessageDescriptor>;

export default messages;
