import { prisma } from '@';
import * as R from 'ramda';

import { createAppointmentRevenue } from '@/services/revenue.service';
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
  { id, sessions = [], items = [], discount = 0 },
  { userId, organizationId }
) => {
  // const persistedAppointment = await prisma.appointment.findUnique({
  //   where: { id },
  //   include: true,
  //   images: true,
  // });
  // const status = getAppointmentNextStatus(
  //   persistedAppointment.status,
  //   APPOINTMENTS_STATUS.ARCHIVED
  // );

  const appointment = await prisma.appointment.update({
    data: { status: APPOINTMENTS_STATUS.ARCHIVED },
    where: { id },
    include: {
      labs: true,
      images: true,
    },
  });

  await createAppointmentRevenue(id, sessions);
  if (discount) {
    await createAppointmentExpense(id, discount);
  }
  await updatedUsedMaterials(id, items);
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
  console.log(configuration);
  const enable = configuration.enableInvoiceCounter;
  if (enable) {
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
