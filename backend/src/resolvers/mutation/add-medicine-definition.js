import { prisma } from '@';

const addMedicineDefinition = async (_, { medicineDefinition }, { userId }) => {
  return prisma.medicineDefinition.create({
    data: {
      ...medicineDefinition,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default addMedicineDefinition;
