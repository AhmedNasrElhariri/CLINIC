import { prisma } from '@';

const myToothTransactions = async (
  _,
  { toothNumber, toothPartNumber, patientId },
  { userId, organizationId }
) => {
  const tooth = await prisma.tooth.findMany({
    where: {
      toothNumber,
      toothPartNumber,
      patientId,
    },
  });
  const toothId = tooth[0].id;
  const transactions = await prisma.toothTransaction.findMany({
    where: {
      toothId: toothId,
    },
    include: {
      tooth: true,
      dentalDiagnosis: true,
      doctor: true,
    },
  });
  return transactions;
};

export default myToothTransactions;
