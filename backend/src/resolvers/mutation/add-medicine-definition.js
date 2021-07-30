import { prisma } from '@';
import { GetLevel } from '@/services/get-level';

const addMedicineDefinition = async (_, { medicineDefinition }, { userId }) => {
  const { specialtyId, branchId, userId: userID, ...rest } = medicineDefinition;
  const level = GetLevel(branchId, specialtyId, userID);
  return prisma.medicineDefinition.create({
    data: Object.assign(
      {
        ...rest,
        level:level,
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

export default addMedicineDefinition;
