import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
const addHospital = async (_, { hospital }, { organizationId, userId }) => {
  const { specialtyId, branchId, userId: userID, ...rest } = hospital;
  const level = GetLevel(branchId, specialtyId, userID);
  return prisma.hospital.create({
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

export default addHospital;
