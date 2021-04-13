import { prisma } from '@';

const addPayrollPayment = async (_, { payment }, { organizationId }) => {
  let date = new Date();
  let month = date.getUTCMonth() + 1;
  let year = date.getUTCFullYear();
  const payrollDate = 'payment' + '/' + month + '/' + year;
  return prisma.payroll.create({
    data: {
      name: payrollDate,
      status: 'Open',
      date: date,
      payment: payment,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addPayrollPayment;
