import { prisma } from '@';

const editMedicineDefinition = async (_, { medicineDefinition }) => {
  const { id, ...rest } = medicineDefinition;

  return prisma.medicineDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editMedicineDefinition;
