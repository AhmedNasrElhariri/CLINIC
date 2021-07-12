import { prisma } from '@';
import * as R from 'ramda';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS,APPOINTMENTS_STATUS } from '@/utils/constants';

const generateWhereCondition = ({ status, dateFrom, dateTo }) => ({
  date: {
    gte: dateFrom,
    lte: dateTo,
  },
  status,
});

const appointments = async (
  _,
  { input,
    offset,
    limit,
    dateFrom,
    dateTo,
    status = APPOINTMENTS_STATUS.SCHEDULED, },
  { user, organizationId }
) => {
  const ids = await listFlattenUsersTreeIds({
    user,
    organizationId,
    action: ACTIONS.List_Appointment,
  });
  const appointmentsCount = await prisma.appointment.count({
    where: generateWhereCondition({ dateFrom, dateTo, status }),
  });
  const appointments = await prisma.appointment.findMany({
    where: generateWhereCondition({ dateFrom, dateTo, status }),
    include: {
      specialty: true,
      branch: true,
      doctor: true,
      session:true,
    },
    skip: offset,
    take: limit,
  });
  const data = {
    appointments: appointments,
    appointmentsCount: appointmentsCount,
  };
  return data;
};

export default appointments;
