import { CostServices } from '@/services/cost.service';
import { prisma } from '@';

const archiveReferedDoctorAppointment = async (
  _,
  { data },
  { userId, organizationId }
) => {
  const {
    sessions,
    appointmentId: id,
    doctorId: userID,
    branchId,
    specialtyId,
  } = data;
  const referedStatus = 'Credit';
  const date = new Date();
  await CostServices(
    userId,
    sessions,
    organizationId,
    branchId,
    date,
    specialtyId,
    userID,
    id,
    referedStatus
  );
  await prisma.appointment.update({
    data: { accounted: true },
    where: { id },
  });
  return true;
};

export default archiveReferedDoctorAppointment;
