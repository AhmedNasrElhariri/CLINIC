import { prisma } from '@';

const patientRevenue = async (_, { patientId }) => {
  const revenues = await prisma.revenue.findMany({
    where: {
      patientId,
    },
  });
  const bankRevenues = await prisma.bankRevenue.findMany({
    where: {
      patientId,
    },
  });
  const insuranceRevenues = await prisma.insuranceRevenue.findMany({
    where: {
      patientId,
    },
  });
  const updatedRevenues = revenues.map(r => {
    return {
      id: r.id,
      name: r.name,
      amount: r.amount,
      type: 'Cash',
      date: r.date,
    };
  });
  const updatedBankRevenues = bankRevenues.map(r => {
    return {
      id: r.id,
      name: r.name,
      amount: r.amount,
      type: 'Bank',
      date: r.date,
    };
  });
  const updatedInsuranceRevenues = insuranceRevenues.map(r => {
    return {
      id: r.id,
      name: r.name,
      amount: r.amount,
      type: 'Insurrance',
      date: r.date,
    };
  });
  const finialRevenues = [
    ...updatedRevenues,
    ...updatedBankRevenues,
    ...updatedInsuranceRevenues,
  ];
  return finialRevenues;
};

export default patientRevenue;
