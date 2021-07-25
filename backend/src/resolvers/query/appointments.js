import { prisma } from '@';
import moment from 'moment';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS, APPOINTMENTS_STATUS } from '@/utils/constants';

const appointments = async (
  _,
  {
    input,
    offset,
    type,
    patient,
    limit,
    dateFrom,
    dateTo,
    status = APPOINTMENTS_STATUS.SCHEDULED,
  },
  { user, organizationId }
) => {
  const startDay = moment(dateFrom).startOf('day').toDate();
  const endDay = moment(dateTo).endOf('day').toDate();
  const ids = await listFlattenUsersTreeIds({
    user,
    organizationId,
    action: ACTIONS.List_Appointment,
  });
  const appointmentsCount = await prisma.appointment.count({
    where: {
      date: {
        gte: startDay,
        lte: endDay,
      },
      status,
      type: type,
      OR: [
        {
          patient: {
            name: {
              contains: patient,
              mode:"insensitive",
            },
          },
        },
        {
          patient: {
            phoneNo: {
              contains: patient,
            },
          },
        },
      ],
    },
  });
  const appointments = await prisma.appointment.findMany({
    where: {
      date: {
        gte: startDay,
        lte: endDay,
      },
      status,
      type: type,
      OR: [
        {
          patient: {
            name: {
              contains: patient,
              mode:"insensitive",
            },
          },
        },
        {
          patient: {
            phoneNo: {
              contains: patient,
            },
          },
        },
      ],
    },
    include: {
      specialty: true,
      branch: true,
      doctor: true,
      session: true,
    },
    skip: offset ,
    take: limit,
  });
  const data = {
    appointments: appointments,
    appointmentsCount: appointmentsCount,
  };
  return data;
};

export default appointments;
