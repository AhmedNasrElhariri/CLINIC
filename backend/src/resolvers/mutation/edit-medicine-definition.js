import { prisma } from '@';

const editMedicineDefinition = async (_, { medicineDefinition, type }) => {
  const { id, ...rest } = medicineDefinition;
  if (type === 'edit') {
    return prisma.medicineDefinition.update({
      data: rest,
      where: {
        id,
      },
    });
  } else {
    return prisma.medicineDefinition.delete({
      where: {
        id,
      },
    });
  }
};

export default editMedicineDefinition;
