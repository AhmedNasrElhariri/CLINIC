import { prisma } from '@';

const payRollUser = async (_, { payment }, { organizationId }) => {
  let date = new Date();
  let month = date.getUTCMonth() + 1;
  let year = date.getUTCFullYear();
  const payRollDate = 'payment' +'/'+ month + '/' + year;
  return prisma.payRoll.create({
    data: {
      name: payRollDate,
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

export default payRollUser;
