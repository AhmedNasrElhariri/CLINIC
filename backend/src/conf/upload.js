import fileUpload from 'express-fileupload';
import { upload } from '@/services/upload.service';
const init = app => {
  app.use(fileUpload());
  app.post('/upload', async function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const areMultipleFiles = Array.isArray(req.files.file);
    const files = areMultipleFiles ? req.files.file : [req.files.file];
    const response = await Promise.all(files.map(f => upload(f)));
    res.send(response);
  });
};

export default init;

// import { generatePdf } from '@/services/report.service';
// import { prisma } from '..';
// import { formatDate, formatDateStandard } from './../services/date.service';
// let totalAmount = 0;
// const init = app => {
//   // const calTotal = arr => {
//   //   arr.forEach(el => {
//   //     totalAmount += el.amount;
//   //   });
//   //   return totalAmount;
//   // };
//   app.get('/monthly', async (req, res) => {
//     try {
//       // const revenue = await prisma.revenue.findMany({});
//       // const expenses = await prisma.expense.findMany({});
//       // const examinations = await prisma.appointment.findMany({
//       //   where: {
//       //     type: 'Examination',
//       //   },
//       // });
//       // const followups = await prisma.appointment.findMany({
//       //   where: {
//       //     type: 'Followup',
//       //   },
//       // });
//       // const sessions = await prisma.appointment.findMany({
//       //   where: {
//       //     type: 'Session',
//       //   },
//       // });
//       // const courses = await prisma.appointment.findMany({
//       //   where: {
//       //     type: 'Course',
//       //   },
//       // });
//       // const totalRevenues = calTotal(revenue),
//       //   totalExpenses = calTotal(expenses),
//       //   numOfExamination = examinations.length,
//       //   numOfFollowup = followups.length,
//       //   numOfSession = sessions.length,
//       //   numOfCourses = courses.length;
//       // const monthYear = formatDate(new Date(), 'MM-YYYY');
//       // const pulses = await prisma.pulse.findMany({});
//       // const pulsesControl = await prisma.pulseControl.findMany({});
//       // let total = 0;
//       // const data = pulsesControl.map(p => {
//       //   let date = formatDateStandard(p.date);
//       //   let actual = p.after - p.before;
//       //   let numOfPulses = 0;
//       //   pulses.forEach(pl => {
//       //     if (formatDateStandard(pl.date) == date) {
//       //       numOfPulses += pl.pulses;
//       //     }
//       //   });
//       //   total += numOfPulses;
//       //   return {
//       //     date: date,
//       //     numOfPulses: numOfPulses,
//       //     before: p.before,
//       //     after: p.after,
//       //     diff: actual - numOfPulses,
//       //   };
//       // });
//       const pdfDoc = await generatePdf('/views/reports/monthly.ejs', {
//         // data: data,
//         // month: monthYear,
//         // total: total,
//         // totalRevenues: totalRevenues,
//         // totalExpenses: totalExpenses,
//         // numOfExamination: numOfExamination,
//         // numOfFollowup: numOfFollowup,
//         // numOfSession: numOfSession,
//         // numOfCourses: numOfCourses,
//         test: 'dddd',
//       });
//       pdfDoc.pipe(res);
//       pdfDoc.end();
//     } catch (e) {
//       res.status(400).send('Invalid Data');
//     }
//   });

//   app.get('/daily', async (req, res) => {
//     try {
//       // const pulses = await prisma.pulse.findMany({
//       //   where:{

//       //   }
//       // });
//       // const data = pulses.map(p => {
//       //   const app =  prisma.appointment
//       //     .findOne({ where: { id: p.appointmentId } });
//       //       return {
//       //         doctor: app.userId,
//       //         patient: app.patientId,
//       //         powerOne: p.powerOne,
//       //         powerTwo: p.powerTwo,
//       //         pulses: p.pulses,
//       //         type: app.type,
//       //       };
//       // });
//       const pdfDoc = await generatePdf('/views/reports/daily.ejs', {
//         test: 'ddd',
//       });
//       pdfDoc.pipe(res);
//       pdfDoc.end();
//     } catch (e) {
//       res.status(400).send('Invalid');
//     }
//   });
// };

// export default init;
