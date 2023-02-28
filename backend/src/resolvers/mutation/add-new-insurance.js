import { prisma } from '@';

import { APIExceptcion } from '@/services/erros.service';
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
import moment from 'moment';

const updatePatientCardInfo = (patientId, { cardId, cardExpiryDate }) => {
  return prisma.patient.update({
    data: {
      cardId: cardId,
      cardExpiryDate: cardExpiryDate,
    },
    where: {
      id: patientId,
    },
  });
};

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
    cardId,
    cardExpiryDate,
  } = insurance;

  if (!cardId) {
    throw new APIExceptcion('Invalid card Id');
  }

  if (
    !cardExpiryDate ||
    moment(cardExpiryDate).endOf('day').isBefore(moment())
  ) {
    throw new APIExceptcion('Expired card');
  }

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
      companyId,
      cardId
    )
  );

  await updatePatientCardInfo(patientId, { cardId, cardExpiryDate });

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
