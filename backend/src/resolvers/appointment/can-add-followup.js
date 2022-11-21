import { prisma } from '@';

const canAddFollowUp = ({ appointmentFollowUpId }) => {
  if (appointmentFollowUpId) {
    return false;
  } else {
    return true;
  }
};

export default canAddFollowUp;
