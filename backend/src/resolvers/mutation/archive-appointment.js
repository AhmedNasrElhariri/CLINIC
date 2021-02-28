import { prisma } from '@';
import { getAppointmentNextStatus } from '@/services/appointment.service';
import { createAppointmentRevenue } from '@/services/revenue.service';
import { createAppointmentExpense } from '@/services/expense.service';
import { APPOINTMENTS_STATUS } from '@/utils/constants';
import {
  createSubstractHistoryForMultipleItems,
  updatedUsedMaterials,
} from '@/services/inventory.service';

const archiveAppointment = async (
  _,
  { id, sessions = [], items = [], discount = 0 },
  { userId ,organizationId}
) => {
  const persistedAppointment = await prisma.appointment.findOne({
    where: { id },
  });
  const status = getAppointmentNextStatus(
    persistedAppointment.status,
    APPOINTMENTS_STATUS.ARCHIVED
  );

  const appointment = await prisma.appointment.update({
    data: { status },
    where: { id },
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
  const existedOrganization =   await prisma.organization.findOne({
    where: { id : organizationId },
  });
  const newInvoiceCounter = existedOrganization.invoiceCounter + 1; 
  await prisma.organization.update({
    where: { id : organizationId },
    data: { 
      invoiceCounter: newInvoiceCounter,
     },
  });
  return appointment;
};

export default archiveAppointment;
