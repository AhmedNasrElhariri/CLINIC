import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
const addSessionDefinition = async (
  _,
  { sessionDefinition },
  { organizationId, userId }
) => {
  const { name, price, branchId, specialtyId } = sessionDefinition;
  const level = GetLevel(branchId, specialtyId, userId);
  return prisma.sessionDefinition.create({
    data: Object.assign(
      {
        name,
        price,
        level,
        organization: {
          connect: {
            id: organizationId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      specialtyId && {
        specialty: {
          connect: {
            id: specialtyId,
          },
        },
      },
      branchId && {
        branch: {
          connect: {
            id: branchId,
          },
        },
      }
    ),
  });
};

export default addSessionDefinition;
