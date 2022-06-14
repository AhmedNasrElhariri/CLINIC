import { prisma } from '@';

const mySessionsDefinition = async (
  _,
  { organizationId: OrganizationId },
  { user, organizationId }
) => {
  const newOrgId = OrganizationId ? OrganizationId : organizationId;
  return prisma.sessionDefinition.findMany({
    where: {
      organizationId: newOrgId,
    },
  });
};

export default mySessionsDefinition;
