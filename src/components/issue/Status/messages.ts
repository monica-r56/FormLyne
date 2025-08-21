import { defineMessages } from 'react-intl';

const messages = defineMessages({
  backlog: {
    id: 'status.backlog',
    defaultMessage: 'Backlog',
  },
  todo: {
    id: 'status.todo',
    defaultMessage: 'To do',
  },
  inProgress: {
    id: 'status.inProgress',
    defaultMessage: 'In Progress',
  },
  done: {
    id: 'status.done',
    defaultMessage: 'Done',
  },
  cancelled: {
    id: 'status.cancelled',
    defaultMessage: 'Cancelled',
  },
  duplicate: {
    id: 'status.duplicate',
    defaultMessage: 'Duplicate',
  },
});

export default messages;
