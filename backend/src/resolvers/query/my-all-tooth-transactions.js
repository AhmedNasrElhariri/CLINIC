import { prisma } from '@';
import * as R from 'ramda';
const myAllToothTransactions = async (
  _,
  { patientId },
  { userId, organizationId }
) => {
  const tooths = await prisma.tooth.findMany({
    where: {
      patientId,
    },
  });
  const toothIds = R.map(R.path(['id']))(tooths);
  const transactions = await prisma.toothTransaction.findMany({
    where: {
      toothId: {
        in: toothIds,
      },
    },
    orderBy: {
      date: 'desc'
    },
    include: {
      tooth: true,
      dentalDiagnosis: true,
      doctor: true,
    },
  });
  return transactions;
};

export default myAllToothTransactions;
