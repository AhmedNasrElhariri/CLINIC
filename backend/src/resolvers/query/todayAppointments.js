import moment, { utc } from 'moment';
import { fetchWithCount } from '@/services/query';

const todayAppointments = async (
  _,
  { offset, limit, status, doctorId, specialtyId, branchId, patient },
  { organizationId }
) => {
  const finalStatus =
    status === 'Scheduled' ? ['Scheduled', 'Changed'] : [status];
  const HOUR = moment().utc().hours();
  let from = moment();
  let to = moment();

  if (HOUR >= 21) {
    from = moment().utc().subtract(1, 'd').startOf('day').toDate();
    to = moment().utc().subtract(1, 'd').endOf('day').toDate();
  } else {
    from = moment().utc().startOf('day').toDate();
    to = moment().utc().endOf('day').toDate();
  }

  const [appointments, count] = await fetchWithCount('appointment', {
    where: {
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
