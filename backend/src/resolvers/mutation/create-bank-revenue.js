import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
const createBankRevenue = async (
  _,
  { bankTransition },
  { userId, organizationId }
) => {
  const {
    specialtyId,
    branchId,
    userId: userID,
    bankId,
    ...rest
  } = bankTransition;
  const level = GetLevel(branchId, specialtyId, userID);
  return prisma.bankRevenue.create({
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
        bank: {
          connect: {
            id: bankId,
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
        doctor: {
          connect: {
            id: userID,
          },
        },
      }
    ),
  });
};

export default createBankRevenue;
