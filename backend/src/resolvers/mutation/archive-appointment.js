import { prisma } from '@';
import * as R from 'ramda';

import {
  createAppointmentRevenue,
  createAppointmentRevenueFromSessions,
} from '@/services/revenue.service';
import { createAppointmentExpense } from '@/services/expense.service';
import { APPOINTMENTS_STATUS } from '@/utils/constants';
import {
  createSubstractHistoryForMultipleItems,
  updatedUsedMaterials,
} from '@/services/inventory.service';
import { updateLabsAfterArchiveAppointment } from '@/services/lab.service';
import { updateImagesAfterArchiveAppointment } from '@/services/image.service';

const archiveAppointment = async (
  _,
  { id, sessions = [], items = [], discount = 0, others = 0 },
  { userId, organizationId }
) => {
  const appointment = await prisma.appointment.update({
    data: { status: APPOINTMENTS_STATUS.ARCHIVED },
    where: { id },
    include: {
      labs: true,
      images: true,
    },
  });

  await createAppointmentRevenue(
    createAppointmentRevenueFromSessions(userId, sessions)
  );
  if (others) {
    await prisma.revenue.create({
      data: {
        name: 'Others',
        date: new Date(),
        amount: others,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  if (discount) {
    await createAppointmentExpense(userId, discount);
  }

  await updatedUsedMaterials(userId, items);

  await createSubstractHistoryForMultipleItems({
    data: items,
    userId,
    patientId: appointment.patientId,
  });

  const { labs, images } = appointment;

  await Promise.all([
    updateLabsAfterArchiveAppointment(R.map(R.prop('id'))(labs)),
    updateImagesAfterArchiveAppointment(R.map(R.prop('id'))(images)),
  ]);

  const configuration = await prisma.configuration.findUnique({
    where: { userId },
  });
  if (configuration && configuration.enable) {
    const existedOrganization = await prisma.organization.findUnique({
      where: { id: organizationId },
    });
    const newInvoiceCounter = existedOrganization.invoiceCounter + 1;
    await prisma.organization.update({
      where: { id: organizationId },
      data: {
        invoiceCounter: newInvoiceCounter,
      },
    });
  }
  return appointment;
};

export default archiveAppointment;
