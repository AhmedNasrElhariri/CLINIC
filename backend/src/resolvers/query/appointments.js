import { prisma } from '@';
import moment from 'moment';
import CryptoJS from 'crypto-js';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS, APPOINTMENTS_STATUS } from '@/utils/constants';

const appointments = async (
  _,
  {
    offset,
    type,
    patient = '',
    limit,
    dateFrom,
    dateTo,
    status = APPOINTMENTS_STATUS.SCHEDULED,
  },
  { user, organizationId }
) => {
  const offset2 = offset + limit;
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.List_Appointment,
    },
    true
  );
  const sortingObj =
    type === APPOINTMENTS_STATUS.WAITING
      ? { updatedAt: 'asc' }
      : {
          date: 'asc',
        };
  const startDay = moment(dateFrom).startOf('day').toDate();
  const endDay = moment(dateTo).endOf('day').toDate();

  const orgAppoointments = await prisma.appointment.findMany({
    where: {
      userId: {
        in: ids,
      },
      date: {
        gte: startDay,
        lte: endDay,
      },
      status,
      type,
    },
    orderBy: [sortingObj],
    include: {
      specialty: true,
      branch: true,
      doctor: true,
      session: true,
      patient: true,
    },
  });
  const updatedOrgAppointments = orgAppoointments.map(app => {
    const { patient } = app;
    const { name: name1, phoneNo: phone1, ...rest } = patient;
    const decryptedName = CryptoJS.AES.decrypt(name1, 'secret key 123');
    const originalName = decryptedName.toString(CryptoJS.enc.Utf8);
    const decryptedPhoneNo = CryptoJS.AES.decrypt(phone1, 'secret key 123');
    const originalPhoneNo = decryptedPhoneNo.toString(CryptoJS.enc.Utf8);
    const newPatient = {
      ...rest,
      name: originalName,
      phoneNo: originalPhoneNo,
    };
    return {
      ...app,
      patient: newPatient,
    };
  });

  const filteredAppointments = updatedOrgAppointments.filter(
    p =>
      p.patient.name.toLowerCase().includes(patient.toLowerCase()) ||
      p.patient.phoneNo.includes(patient)
  );
  const finalAppointments = filteredAppointments.slice(offset, offset2);
  // const appointmentsCount = await prisma.appointment.count({
  //   where: {
  //     date: {
  //       gte: startDay,
  //       lte: endDay,
  //     },
  //     status,
  //     type,
  //     userId: {
  //       in: ids,
  //     },
  //     OR: [
  //       {
  //         patient: {
  //           name: {
  //             contains: patient,
  //             mode: 'insensitive',
  //           },
  //         },
  //       },
  //       {
  //         patient: {
  //           phoneNo: {
  //             contains: patient,
  //           },
  //         },
  //       },
  //     ],
  //   },
  // });
  // const appointments = await prisma.appointment.findMany({
  //   where: {
  //     date: {
  //       gte: startDay,
  //       lte: endDay,
  //     },
  //     status,
  //     type,
  //     userId: {
  //       in: ids,
  //     },
  //     OR: [
  //       {
  //         patient: {
  //           name: {
  //             contains: patient,
  //             mode: 'insensitive',
  //           },
  //         },
  //       },
  //       {
  //         patient: {
  //           phoneNo: {
  //             contains: patient,
  //           },
  //         },
  //       },
  //     ],
  //   },
  //   orderBy: [sortingObj],
  //   include: {
  //     specialty: true,
  //     branch: true,
  //     doctor: true,
  //     session: true,
  //   },
  //   skip: offset,
  //   take: limit,
  // });

  const data = {
    appointments: finalAppointments,
    appointmentsCount: filteredAppointments.length,
  };
  return data;
};

export default appointments;
