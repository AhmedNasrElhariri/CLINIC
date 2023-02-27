import { prisma } from '@';
import moment from 'moment';

// import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { APPOINTMENTS_STATUS } from '@/utils/constants';

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
  // const ids = await listFlattenUsersTreeIds(
  //   {
  //     user,
  //     organizationId,
  //     action: ACTIONS.List_Appointment,
  //   },
  //   false
  // );
  // const sortingObj =
  //   type === APPOINTMENTS_STATUS.WAITING
  //     ? { updatedAt: 'asc' }
  //     : {
  //         date: 'asc',
  //       };
  const startDay = moment(dateFrom).startOf('day').toDate();
  const endDay = moment(dateTo).endOf('day').toDate();
  let appointmentsCount = 0;
  let appointments = [];
  if (dateFrom || patient) {
    appointmentsCount = await prisma.appointment.count({
      where: Object.assign(
        {
          status,
          organizationId,
          AND: [
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
    });
    appointments = await prisma.appointment.findMany({
      where: Object.assign(
        {
          status,
          organizationId,
          AND: [
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
      },
      skip: offset,
      take: limit,
      orderBy: {
        date: 'asc',
      },
    });
  }

  const data = {
    appointments: appointments,
    appointmentsCount: appointmentsCount,
  };
  return data;
};

export default appointments;
