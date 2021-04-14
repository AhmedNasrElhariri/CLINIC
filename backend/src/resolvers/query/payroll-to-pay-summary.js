import { prisma } from '@';

const payrollToPaySummary = (_, { organizationId }) => {
  return prisma.payrollUser.findMany({
    where: {
      organizationId: organizationId,
    },
  });
  // let users = [];
  // const Users = await prisma.payrollUser.findMany({
  //   where:{
  //     organizationId:organizationId,
  //   }
  // });
  // Users.map(u => {
  //   let amount = 0;
  //   let user = {id:null,name:'',amount:0};
  //   const userTransactions = prisma.payrollTransaction.findMany({
  //     where: {
  //       payrollUserId: u.id,
  //       payroll:{
  //         status:'Open',
  //       }
  //     },
  //   });
  //   userTransactions.forEach(transaction => {
  //     amount += transaction.amount;
  //   });
  //   user.id = u.id;
  //   user.name = u.user.name;
  //   user.amount = amount;
  //   users.push(user);
  // });
  // console.log(users,'dkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
  // return users;
};

export default payrollToPaySummary;
