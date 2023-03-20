import { prisma } from '@';

import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';

const allAppointments = async (_, __, { user, organizationId }) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.List_Appointment,
    },
    true
  );

  const appointments = await prisma.appointment.findMany({
    where: {
      OR: [
        {
          userId: {
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
    orderBy: [
      {
        date: 'asc',
      },
    ],
    include: {
      patient: true,
    },
  });
  return appointments;
};

export default allAppointments;
