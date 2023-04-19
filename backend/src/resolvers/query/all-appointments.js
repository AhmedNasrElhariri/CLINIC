import { prisma } from '@';
import { APPOINTMENTS_STATUS } from '@/utils/constants';
import moment from 'moment';

const allAppointments = async (
  _,
  {
    type,
    patient,
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
  return prisma.appointment.findMany({
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
    orderBy: [
      {
        date: 'asc',
      },
    ],
    include: {
      patient: true,
      session: true,
    },
  });
};

export default allAppointments;
