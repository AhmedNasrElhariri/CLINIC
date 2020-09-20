import { NOTIFICATION } from '@/utils/notifications';

export default {
  subscribe: (parent, args, { pubsub }) => {
    return pubsub.asyncIterator(NOTIFICATION);
  },
};
