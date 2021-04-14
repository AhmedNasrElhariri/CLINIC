import { prisma } from '@';

const addPayroll = async (_, { payment }, { organizationId }) => {
  const payrollRow = await prisma.payroll.findMany({
    where: { status: 'Open' },
  });
  let payrollId = '';
  if (payrollRow.length == 0) {
    let date = new Date();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();
    const payrollDate = 'payment' + '/' + month + '/' + year;
    const payroll = await prisma.payroll.create({
      data: {
        name: payrollDate,
        status: 'Open',
        startDate: date,
        endDate:date,
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    });
    payrollId = payroll.id;
    payment.map(u => {
      const user = prisma.payrollUser.findOne({where:{id:u}});
      const amount = user.salary;
      const type = 'Salary';
      prisma.payrollTransaction.create({
        data: {
          amount: amount,
          type: type,
          date: new Date(),
          payrollUser: {
            connect: {
              id: u,
            },
          },
          payroll: {
            connect: {
              id: payrollId,
            },
          },
        },
      });
    });
    return prisma.payroll.update({
      data: {
        status: 'Close',
        endDate:new Date(),
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
      where:{
        id:payrollId
      }
    });
  }else{
    payrollId = payrollRow[0].id;
    payment.map(u => {
      const user = prisma.payrollUser.findOne({where:{id:u}});
      const amount = user.salary;
      const type = 'Salary';
      prisma.payrollTransaction.create({
        data: {
          amount: amount,
          type: type,
          date: new Date(),
          payrollUser: {
            connect: {
              id: u,
            },
          },
          payroll: {
            connect: {
              id: payrollId,
            },
          },
        },
      });
    });
    return prisma.payroll.update({
      data: {
        status: 'Close',
        endDate:new Date(),
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
      where:{
        id:payrollId
      }
    });
  }
};

export default addPayroll;
