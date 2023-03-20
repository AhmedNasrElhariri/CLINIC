import moment from 'moment';
import { fetchWithCount } from '@/services/query';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';
const todayAppointments = async (
  _,
  { offset, limit, status, doctorId, specialtyId, branchId, patient },
  { organizationId, user }
) => {
  const finalStatus =
    status === 'Scheduled' ? ['Scheduled', 'Changed'] : [status];
  const HOUR = moment().utc().hours();
  let from = moment();
  let to = moment();

  if (HOUR === 0) {
    from = moment().utc().subtract(1, 'd').startOf('day').toDate();
    to = moment().utc().subtract(1, 'd').endOf('day').toDate();
  } else {
    from = moment().utc().startOf('day').toDate();
    to = moment().utc().endOf('day').toDate();
  }
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.List_Appointment,
    },
    true
  );
  const [appointments, count] = await fetchWithCount('appointment', {
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
      date: {
        gte: from,
        lte: to,
      },
      status: {
        in: finalStatus,
      },
    },
    orderBy: [
      {
        date: 'asc',
      },
    ],
    skip: offset,
    take: limit,
    include: {
      user: true,
      session: true,
      patient: true,
      doctor: true,
    },
  });

  return { appointments: appointments, appointmentsCount: count };
};

export default todayAppointments;
