import moment from 'moment';

import { APPOINTMENTS_STATUS } from '@/utils/constants';
import { fetchWithCount } from '@/services/query';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

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
  { organizationId, user }
) => {
  const startDay = moment(dateFrom).startOf('day').toDate();
  const endDay = moment(dateTo).endOf('day').toDate();
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.List_Appointment,
    },
    true
  );
  let appointmentsCount = 0;
  let appointments = [];
  if (dateFrom || patient) {
    const [allAppointments, count] = await fetchWithCount('appointment', {
      where: Object.assign(
        {
          status,
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
    appointments = allAppointments;
    appointmentsCount = count;
  }

  const data = {
    appointments: appointments,
    appointmentsCount: appointmentsCount,
  };
  return data;
};

export default appointments;
