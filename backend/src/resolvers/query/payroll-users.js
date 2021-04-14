import { prisma } from '@';

const payrollUsers = (_,  { organizationId })=> {
  return prisma.payrollUser.findMany({
    where:{
      organizationId:organizationId,
    }
  });
  
};

export default payrollUsers;
