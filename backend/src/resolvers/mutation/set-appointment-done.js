import { prisma } from '@';
import { getAppointmentNextStatus } from '@/services/appointment.service';
import { createAppointmentRevenue } from '@/services/revenue.service';
import { createAppointmentExpense } from '@/services/expense.service';
import { APPOINTMENTS_STATUS } from '@/utils/constants';
import {
  createSubstractHistoryForMultipleItems,
  updatedUsedMaterials,
} from '@/services/inventory.service';

const setAppointmentDone = async (
  _,
  { id, sessions = [], items = [], discount = 0 },
  { userId }
) => {
  const persistedAppointment = await prisma.appointment.findOne({
    where: { id },
  });

  const status = getAppointmentNextStatus(
    persistedAppointment.status,
    APPOINTMENTS_STATUS.DONE
  );

  const appointment = await prisma.appointment.update({
    data: { status },
    where: { id },
  });

  const clinicId = appointment.clinicId;

  await createAppointmentRevenue(id, sessions);
  if (discount) {
    await createAppointmentExpense(id, discount);
  }
  await updatedUsedMaterials(id, items);
  await createSubstractHistoryForMultipleItems({
    data: items,
    clinicId,
    userId,
    patientId: appointment.patientId,
  });

  return appointment;
};

export default setAppointmentDone;
