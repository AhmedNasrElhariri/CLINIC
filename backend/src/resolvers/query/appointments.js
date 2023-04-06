import moment from 'moment';

import { APPOINTMENTS_STATUS } from '@/utils/constants';
import { fetchWithCount } from '@/services/query';

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
    doctorId,
    specialtyId,
    branchId,
  },
  { organizationId }
) => {
  const startDay = moment(dateFrom).startOf('day').toDate();
  const endDay = moment(dateTo).endOf('day').toDate();
  const [allAppointments, count] = await fetchWithCount('appointment', {
    where: Object.assign(
      {
        status,
        organizationId,
        AND: [
          ...(patient
            ? [
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
              ]
            : []),
          { branchId, specialtyId, doctorId },
        ],
      },
      dateTo &&
        dateFrom && {
          date: {
            gte: startDay,
            lte: endDay,
          },
        },
      type && {
        sessionId: type,
      }
    ),
    include: {
      specialty: true,
      branch: true,
      doctor: true,
      session: true,
      patient: true,
      user: true,
    },
    skip: offset,
    take: limit,
    orderBy: {
      date: 'asc',
    },
  });

  const data = {
    appointments: allAppointments,
    appointmentsCount: count,
  };
  return data;
};

export default appointments;
