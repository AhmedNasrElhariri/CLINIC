import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
const addSalesDefinition = async (
  _,
  { salesDefinition },
  { organizationId, userId }
) => {
  const {
    specialtyId,
    branchId,
    userId: userID,
    quantity,
    salesId,
    ...rest
  } = salesDefinition;

  const level = GetLevel(branchId, specialtyId, userID);
  return prisma.salesDefinition.create({
    data: Object.assign(
      {
        ...rest,
        totalQuantity: quantity,
        level,
        organization: {
          connect: {
            id: organizationId,
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
      },
      userID && {
        user: {
          connect: {
            id: userID,
          },
        },
      }
    ),
  });
};

export default addSalesDefinition;
