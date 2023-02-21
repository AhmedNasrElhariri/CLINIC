import {
  createAppointmentInsurranceRevenue,
  createAppointmentRevenueFromInsurranceSessions,
  createAppointmentBankRevenueFromInsurranceSessions,
  createAppointmentInsurranceRevenueFromSessions,
} from '@/services/insurrance.service';
import {
  createAppointmentRevenue,
  createAppointmentBankRevenue,
} from '@/services/revenue.service';
const addNewInsurance = async (
  _,
  { insurance },
  { organizationId, userId }
) => {
  const {
    companyId,
    patientId,
    date,
    branchId,
    specialtyId,
    doctorId: userID,
    paymentMethod,
    bankId,
    sessions,
  } = insurance;

  await createAppointmentInsurranceRevenue(
    createAppointmentInsurranceRevenueFromSessions(
      userId,
      sessions,
      organizationId,
      branchId,
      date,
      specialtyId,
      userID,
      patientId,
      companyId
    )
  );
  if (paymentMethod === 'cash') {
    await createAppointmentRevenue(
      createAppointmentRevenueFromInsurranceSessions(
        userId,
        sessions,
        organizationId,
        branchId,
        date,
        specialtyId,
        userID,
        patientId
      )
    );
  } else {
    await createAppointmentBankRevenue(
      createAppointmentBankRevenueFromInsurranceSessions(
        userId,
        sessions,
        organizationId,
        branchId,
        date,
        specialtyId,
        userID,
        patientId,
        bankId
      )
    );
  }
};

export default addNewInsurance;
