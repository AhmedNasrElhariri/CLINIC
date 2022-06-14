import { prisma } from '@';

const patientRevenue = async (_, { patientId, offset, limit }) => {
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
  const allRevenues = [
    ...updatedRevenues,
    ...updatedBankRevenues,
    ...updatedInsuranceRevenues,
  ];
  const limit2 = limit + offset;
  const finialRevenues = allRevenues.slice(offset, limit2);
  let total = 0;
  total = allRevenues.reduce((acc, e) => acc + e.amount, 0);
  const counts = allRevenues.length;
  const data = {
    patientRevenue: finialRevenues,
    totalRevenue: total,
    patientRevenueCounts: counts,
  };
  return data;
};

export default patientRevenue;
