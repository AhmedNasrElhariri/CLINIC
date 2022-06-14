import { prisma } from '@';
import moment from 'moment';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS, APPOINTMENTS_STATUS } from '@/utils/constants';

const appointments = async (
  _,
  {
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
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.List_Appointment,
    },
    false
  );
  const sortingObj =
    type === APPOINTMENTS_STATUS.WAITING
      ? { updatedAt: 'asc' }
      : {
          date: 'asc',
        };
  const startDay = moment(dateFrom).startOf('day').toDate();
  const endDay = moment(dateTo).endOf('day').toDate();
  let appointmentsCount = 0;
  let appointments = [];
  if (dateFrom || patient) {
    appointmentsCount = await prisma.appointment.count({
      where: Object.assign(
        {
          status,
          type,
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
              OR: [
                {
                  patient: {
                    name: {
                      contains: patient,
                      mode: 'insensitive',
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
          ],
        },
        dateTo &&
          dateFrom && {
            date: {
              gte: startDay,
              lte: endDay,
            },
          }
      ),
    });
    appointments = await prisma.appointment.findMany({
      where: Object.assign(
        {
          status,
          type,
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
              OR: [
                {
                  patient: {
                    name: {
                      contains: patient,
                      mode: 'insensitive',
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
          ],
        },
        dateTo &&
          dateFrom && {
            date: {
              gte: startDay,
              lte: endDay,
            },
          }
      ),
      orderBy: [sortingObj],
      include: {
        specialty: true,
        branch: true,
        doctor: true,
        session: true,
      },
      skip: offset,
      take: limit,
    });
  }

  const data = {
    appointments: appointments,
    appointmentsCount: appointmentsCount,
  };
  return data;
};

export default appointments;
