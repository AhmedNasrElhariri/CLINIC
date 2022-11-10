import { prisma } from '@';

const editFollowUpFeature = async (_, { followUp }, { organizationId }) => {
  return prisma.organization.update({
    data: { followUp: followUp },
    where: { id: organizationId },
  });
};

export default editFollowUpFeature;
