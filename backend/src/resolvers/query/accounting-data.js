import { prisma } from '@';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import {
  getDateFromAndDateToFromView,
  getStartOfDay,
  getEndOfDay,
} from '@/services/date.service';
import { ACTIONS } from '@/utils/constants';
import {
  revenueAccountingData,
  expenseAccountingData,
} from '@/services/accounting-data';
import * as R from 'ramda';

const byCreatedAt = R.descend(R.prop('createdAt'));

const accountingData = async (
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
    name,
    accountingOption,
    transactionType,
    bankId
  },
  { user, organizationId }
) => {
  let updatedDateFrom = new Date();
  let updatedDateTo = new Date();
  let trans = [];
  let total = 0;
  let count = 0;
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.View_Accounting,
    },
    false
  );
  if (dateFrom && dateTo) {
    updatedDateFrom = getStartOfDay(dateFrom);
    updatedDateTo = getEndOfDay(dateTo);
  } else {
    const datesArray = getDateFromAndDateToFromView(view);
    updatedDateFrom = datesArray[0];
    updatedDateTo = datesArray[1];
  }
  if (transactionType === 'revenue') {
    const DATA = await revenueAccountingData(
      organizationId,
      ids,
      branchId,
      specialtyId,
      doctorId,
      updatedDateFrom,
      updatedDateTo,
      name,
      offset,
      limit,
      bankId
    );
    const cashData = DATA.cash.map(t => {
      return { ...t, flag: 'cash' };
    });
    const visaData = DATA.visa.map(t => {
      return { ...t, flag: 'visa' };
    });
    if (accountingOption === 'cash') {
      trans = cashData;
      total = DATA.totalCash;
      count = DATA.cashCount;
    } else if (accountingOption === 'visa') {
      trans = visaData;
      total = DATA.totalVisa;
      count = DATA.visaCount;
    } else {
      trans = [...cashData, ...visaData];
      total = DATA.totalCash + DATA.totalVisa;
      count = DATA.cashCount + DATA.visaCount;
    }
  } else {
    const DATA = await expenseAccountingData(
      organizationId,
      ids,
      branchId,
      specialtyId,
      doctorId,
      updatedDateFrom,
      updatedDateTo,
      name,
      offset,
      limit,
      bankId
    );
    const cashData = DATA.cash.map(t => {
      return { ...t, flag: 'cash' };
    });
    const visaData = DATA.visa.map(t => {
      return { ...t, flag: 'visa' };
    });
    if (accountingOption === 'cash') {
      trans = cashData;
      total = DATA.totalCash;
      count = DATA.cashCount;
    } else if (accountingOption === 'visa') {
      trans = visaData;
      total = DATA.totalVisa;
      count = DATA.visaCount;
    } else {
      trans = [...cashData, ...visaData];
      total = DATA.totalCash + DATA.totalVisa;
      count = DATA.cashCount + DATA.visaCount;
    }
  }
  const sortedTrans = R.sort(byCreatedAt, trans);
  const data = {
    data: sortedTrans.slice(offset, offset + limit),
    total: total,
    count: count,
  };
  return data;
};

export default accountingData;
