import { prisma } from '@';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const InsuranceTransactions = async (
  _,
  {
    offset,
    limit,
    dateFrom,
    dateTo,
    view,
    doctorId,
    specialtyId,
    branchId,
    companyId,
    status,
  },
  { user, organizationId }
) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.ViewInsurance_Accounting,
    },
    true
  );
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
  const insuranceTransactions = await prisma.insuranceRevenue.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              doctorId: {
                in: ids,
              },
            },
            {
              branchId: {
                in: ids,
              },
            },
            {
              specialtyId: {
                in: ids,
              },
            },
          ],
        },
        {
          AND: [
            {
              branchId,
            },
            {
              specialtyId,
            },
            {
              doctorId,
            },
            {
              companyId,
            },
          ],
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
      organizationId,
      status,
    },
    include: {
      company: true,
      user: true,
      branch: true,
      specialty: true,
      doctor: true,
      companySession: true,
    },
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });
  const totalInsuranceDebit = await prisma.insuranceRevenue.aggregate({
    _sum: {
      amount: true,
    },
    _count: {
      id: true,
    },
    where: {
      organizationId,
      AND: [
        {
          OR: [
            {
              doctorId: {
                in: ids,
              },
            },
            {
              branchId: {
                in: ids,
              },
            },
            {
              specialtyId: {
                in: ids,
              },
            },
          ],
        },
        {
          AND: [
            {
              branchId,
            },
            {
              specialtyId,
            },
            {
              doctorId,
            },
            {
              companyId,
            },
          ],
        },
      ],
      date: {
        gte: updatedDateFrom,
        lte: updatedDateTo,
      },
      status,
    },
  });
  const sum = totalInsuranceDebit._sum.amount;
  const count = totalInsuranceDebit._count.id;
  const data = {
    insuranceTransactions: insuranceTransactions,
    totalInsuranceDebit: sum,
    InsuranceDebitCount: count,
  };
  return data;
};

export default InsuranceTransactions;
