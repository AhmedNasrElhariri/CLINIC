import { prisma } from '@';

const createMedicineHistory = async (
  _,
  { medicineHistory: { patientId, ...medicineHistory } }
) => {
  return prisma.medicineHistory.create({
    data: {
      patient: {
        connect: {
          id: patientId,
        },
      },
      ...medicineHistory,
    },
  });
};

export default createMedicineHistory;
