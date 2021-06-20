import { generatePdf } from '@/services/report.service';
import moment from 'moment';
import * as R from 'ramda';
import { prisma } from '..';
import { formatDateStandard } from './../services/date.service';

const byAppointmentDate = R.groupBy(function (appointment) {
  const date = formatDateStandard(appointment.date);
  return date;
});

const init = app => {
  app.get('/pdf', async (req, res) => {
    try {
      const pdfDoc = await generatePdf('/views/reports/rt.ejs', {
        test: 'ddddddddd',
      });
      res.end(pdfDoc);
    } catch (e) {
      res.status(400).send(e);
      res.status(400).send('Invalid');
    }
  });

  app.get('/monthly', async (req, res) => {
    const { month } = req.query;
    const endOfMonth = moment(month).clone().endOf('month').toDate();
    const monthName = moment(month).format('MMMM YYYY');

      const revenue = await prisma.revenue.aggregate({
        sum: {
          amount: true,
        },
        where: {
          date: {
            gte: month,
            lte: endOfMonth,
          },
        },
      });
      const revenues = revenue.sum.amount === null ? 0 : revenue.sum.amount;
      const sales = await prisma.sales.aggregate({
        sum: {
          totalPrice: true,
        },
        where: {
          date: {
            gte: month,
            lte: endOfMonth,
          },
        },
      });
      const totalSales =
        sales.sum.totalPrice === null ? 0 : sales.sum.totalPrice;
      const expense = await prisma.expense.aggregate({
        sum: {
          amount: true,
        },
        where: {
          date: {
            gte: month,
            lte: endOfMonth,
          },
        },
      });
      const expenses = expense.sum.amount === null ? 0 : expense.sum.amount;
      const examinations = await prisma.appointment.findMany({
        where: {
          NOT: {
            // pulses: null,
          },
          type: 'Examination',
          date: {
            gte: month,
            lte: endOfMonth,
          },
        },
      });
      const followups = await prisma.appointment.findMany({
        where: {
          NOT: {
            // pulses: null,
          },
          type: 'Followup',
          date: {
            gte: month,
            lte: endOfMonth,
          },
        },
      });
      const sessions = await prisma.appointment.findMany({
        where: {
          NOT: {
            // pulses: null,
          },
          type: 'Session',
          date: {
            gte: month,
            lte: endOfMonth,
          },
        },
      });
      const courses = await prisma.appointment.findMany({
        where: {
          NOT: {
            // pulses: null,
          },
          type: 'Course',
          date: {
            gte: month,
            lte: endOfMonth,
          },
        },
      });
      const appointments = await prisma.appointment.findMany({
        where: {
          NOT: {
            pulses: null,
          },
          date: {
            gte: month,
            lte: endOfMonth,
          },
        },
      });
      const groupingAppointment = byAppointmentDate(appointments);
      const pulsesControl = await prisma.pulseControl.findMany({
        where: {
          date: {
            gte: month,
            lte: endOfMonth,
          },
        },
      });
      const data = pulsesControl.map(p => {
        let date = formatDateStandard(p.date);
        let actual = p.after - p.before;
        let numOfPulses = 0;
        let pulses = groupingAppointment[date];
        if (typeof pulses !== 'undefined' && pulses.length != 0) {
          pulses.forEach(pl => {
            numOfPulses += pl.pulses;
          });
          return {
            date: date,
            numOfPulses: numOfPulses,
            before: p.before,
            after: p.after,
            diff: actual - numOfPulses,
          };
        } else {
          return {
            date: date,
            numOfPulses: 0,
            before: p.before,
            after: p.after,
            diff: actual - numOfPulses,
          };
        }
      });
      const numOfExamination = examinations.length,
        numOfFollowup = followups.length,
        numOfSession = sessions.length,
        numOfCourses = courses.length;
      const pdfDoc = {
        totalRevenues: revenues,
        monthName: monthName,
        totalSales: totalSales,
        totalExpenses: expenses,
        numOfExamination: numOfExamination,
        numOfFollowup: numOfFollowup,
        numOfSession: numOfSession,
        numOfCourses: numOfCourses,
        data: data,
      };
      res.json(pdfDoc);
  });

  app.get('/daily', async(req, res) => {
    const { day } = req.query;
    const dayName = moment(day).format('DD-MM-YYYY');
    const endOfDay = moment(day).endOf('day').toDate();
    const startOfDay = moment(day).startOf('day').toDate();
      const appointments =  await prisma.appointment.findMany({
        where: {
          NOT: {
            pulses: null,
          },
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        include: {
          user: true,
          patient: true,
        },
      });
      const data = appointments.map(p => {
        return {
          doctor: p.user.name,
          patient: p.patient.name,
          powerOne: p.powerOne,
          powerTwo: p.powerTwo,
          pulses: p.pulses,
        };
      });
      res.json(data);
  });
};

export default init;
