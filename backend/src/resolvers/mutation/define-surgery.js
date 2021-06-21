import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
const defineSurgery = async (_, { surgery }, { organizationId ,userId}) => {
  const { specialtyId, branchId, userId: userID, ...rest } = surgery;
  const level = GetLevel(branchId, specialtyId, userId);
  return prisma.surgery.create({
    data: Object.assign(
      {
        ...rest,
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

export default defineSurgery;
