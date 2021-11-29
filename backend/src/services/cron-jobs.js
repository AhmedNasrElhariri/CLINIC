import CryptoJS from 'crypto-js';
import moment from 'moment';
import { PrismaClient } from '@prisma/client';
import { formatDateFull } from './date.service';

export const prisma = new PrismaClient();
const accountSid = 'AC09bda433375a5645246e6bacd9588605';
const authToken = '6262a4cebde03d1fac0f5d1a207766ed';
const client = require('twilio')(accountSid, authToken);

export const tomorrowAppointmentsReminder = async () => {
  const day = moment(new Date()).add(1, 'days').toDate();
  const from = moment(day).startOf('day').toDate();
  const to = moment(day).endOf('day').toDate();
  const tomorrowAppointments = await prisma.appointment.findMany({
    where: {
      status: 'Scheduled',
      accounted: false,
      date: {
        lte: to,
        gte: from,
      },
    },
    include: {
      patient: true,
    },
  });
  tomorrowAppointments.forEach(a => {
    const { patient, date } = a;
    const phoneNo = patient.phoneNo;
    const updatedDate = formatDateFull(date);
    const decryptedPhoneNo = CryptoJS.AES.decrypt(phoneNo, 'secret key 123');
    const originalPhoneNo = decryptedPhoneNo.toString(CryptoJS.enc.Utf8);
    const receiverPhoneNo = '+2' + originalPhoneNo;
    const originalMessage = 'You have Appointment at ' + updatedDate;
    client.messages
      .create({
        from: '+18067794081', // the phone number of the application owner // add 'whatsapp:+...'
        body: originalMessage,
        to: receiverPhoneNo, // add 'whatsapp:+...'
      })
      .then(message => console.log(message));
  });
};

export const before3daysSurgeriesReminder = async () => {
  const after3days = moment(new Date()).add(3, 'days').toDate();
  const from = moment(after3days).startOf('day').toDate();
  const to = moment(after3days).endOf('day').toDate();
  const surgeries = await prisma.patientSurgery.findMany({
    where: {
      date: {
        lte: to,
        gte: from,
      },
    },
    include: {
      patient: true,
      hospital: true,
      surgery: true,
    },
  });
  surgeries.forEach(s => {
    const { patient, date, hospital, surgery } = s;
    const phoneNo = patient.phoneNo;
    const updatedDate = formatDateFull(date);
    const decryptedPhoneNo = CryptoJS.AES.decrypt(phoneNo, 'secret key 123');
    const originalPhoneNo = decryptedPhoneNo.toString(CryptoJS.enc.Utf8);
    const receiverPhoneNo = '+2' + originalPhoneNo;
    const originalMessage =
      'You will have Surgery ' +
      surgery.name +
      'at ' +
      updatedDate +
      'in ' +
      hospital.name;
    client.messages
      .create({
        from: '+18067794081', // the phone number of the application owner // add 'whatsapp:+...'
        body: originalMessage,
        to: receiverPhoneNo, // add 'whatsapp:+...'
      })
      .then(message => console.log(message));
  });
};

export const beforeOneDaySurgeryReminder = async () => {
  const afterOneday = moment(new Date()).add(1, 'days').toDate();
  const from = moment(afterOneday).startOf('day').toDate();
  const to = moment(afterOneday).endOf('day').toDate();
  const surgeries = await prisma.patientSurgery.findMany({
    where: {
      date: {
        lte: to,
        gte: from,
      },
    },
    include: {
      patient: true,
      hospital: true,
      surgery: true,
    },
  });
  surgeries.forEach(s => {
    const { patient, date, hospital, surgery } = s;
    const phoneNo = patient.phoneNo;
    const updatedDate = formatDateFull(date);
    const decryptedPhoneNo = CryptoJS.AES.decrypt(phoneNo, 'secret key 123');
    const originalPhoneNo = decryptedPhoneNo.toString(CryptoJS.enc.Utf8);
    const receiverPhoneNo = '+2' + originalPhoneNo;
    const originalMessage =
      'You will have Surgery ' +
      surgery.name +
      'at ' +
      updatedDate +
      'in ' +
      hospital.name;
    client.messages
      .create({
        from: '+18067794081', // the phone number of the application owner // add 'whatsapp:+...'
        body: originalMessage,
        to: receiverPhoneNo, // add 'whatsapp:+...'
      })
      .then(message => console.log(message));
  });
};

export const every6HoursAppointmentReminder = async () => {
  const after6Hours = moment(new Date()).add(6, 'hours').toDate();
  const dateNow = new Date();
  const appointments = await prisma.appointment.findMany({
    where: {
      status: 'Scheduled',
      accounted: false,
      date: {
        lte: after6Hours,
        gte: dateNow,
      },
    },
    include: {
      patient: true,
    },
  });
  appointments.forEach(a => {
    const { patient, date } = a;
    const phoneNo = patient.phoneNo;
    const updatedDate = formatDateFull(date);
    const decryptedPhoneNo = CryptoJS.AES.decrypt(phoneNo, 'secret key 123');
    const originalPhoneNo = decryptedPhoneNo.toString(CryptoJS.enc.Utf8);
    const receiverPhoneNo = '+2' + originalPhoneNo;
    const originalMessage = 'You have Appointment at ' + updatedDate;
    client.messages
      .create({
        from: '+18067794081', // the phone number of the application owner // add 'whatsapp:+...'
        body: originalMessage,
        to: receiverPhoneNo, // add 'whatsapp:+...'
      })
      .then(message => console.log(message));
  });
};
