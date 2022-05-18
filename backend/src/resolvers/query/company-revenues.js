import { prisma } from '@';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';
// import { listFlattenUsersTreeIds } from '@/services/permission.service';
// import { ACTIONS } from '@/utils/constants';

const CompanyRevenues = async (
  _,
  { offset, limit, dateFrom, dateTo, view, doctorId, specialtyId, branchId },
  { user, organizationId }
) => {
  // const ids = await listFlattenUsersTreeIds(
  //   {
  //     user,
  //     organizationId,
  //     action: ACTIONS.ViewInsurance_Accounting,
  //   },
  //   true
  // );
  let updatedDateFrom = new Date();
  let updatedDateTo = new Date();
  if (dateFrom && dateTo) {
    updatedDateFrom = getStartOfDay(dateFrom);
    updatedDateTo = getEndOfDay(dateTo);
  } else {
    const datesArray = getDateFromAndDateToFromView(view);
    updatedDateFrom = datesArray[0];
    updatedDateTo = datesArray[1];
  }
  const companyRevenues = await prisma.insuranceRevenue.findMany({
    where: {
      AND: [
        {
          branchId: branchId,
        },
        {
          specialtyId: specialtyId,
        },
        {
          doctorId: doctorId,
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
      organizationId,
    },
    include: {
      company: true,
      user: true,
      branch: true,
      specialty: true,
      doctor: true,
    },
    skip: offset,
    take: limit,
    orderBy: {
      date: 'asc',
    },
  });
  const totalRevenues = await prisma.insuranceRevenue.aggregate({
    sum: {
      amount: true,
    },
    count: {
      id: true,
    },
    where: {
      organizationId,
      AND: [
        {
          branchId: branchId,
        },
        {
          specialtyId: specialtyId,
        },
        {
          doctorId: doctorId,
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
    },
  });
  const sum = totalRevenues.sum.amount;
  const count = totalRevenues.count.id;
  const data = {
    companyRevenues: companyRevenues,
    totalRevenues: sum,
    revenuesCount: count,
  };
  return data;
};

export default CompanyRevenues;
