import { generatePdf } from '@/services/report.service';
import { prisma } from '../..';
import { formatDateStandard } from '../../services/date.service';
import moment from 'moment';
import { generateExcel } from '@/services/generate-excel-sheet';

const init = app => {
  app.post('/doctorFees', async (req, res) => {
    const { dateFrom, dateTo, doctorId, organizationId, status } = req.query;
    const startDay = moment(dateFrom).startOf('day').toDate();
    const endDay = moment(dateTo).endOf('day').toDate();
    try {
      const doctorFees = await prisma.doctorFees.findMany({
        where: Object.assign(
          {
            organizationId,
            doctorId,
          },
          dateTo &&
            dateFrom && {
              date: {
                gte: startDay,
                lte: endDay,
              },
            },
          status && { status }
        ),
        include: {
          doctor: true,
          user: true,
        },
        orderBy: {
          date: 'desc',
        },
      });
      const totalDoctorFees = await prisma.doctorFees.aggregate({
        _sum: {
          amount: true,
        },
        where: Object.assign(
          {
            organizationId,
            doctorId,
          },
          dateTo &&
            dateFrom && {
              date: {
                gte: startDay,
                lte: endDay,
              },
            },
          status && { status }
        ),
      });
      const sum = totalDoctorFees._sum.amount;
      const pdfDoc = await generatePdf('/views/reports/doctorFees.ejs', {
        doctorFees: doctorFees,
        totalDoctorFees: sum,
        formatDateStandard: formatDateStandard,
      });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
      res.end(pdfDoc);
    } catch (e) {
      res.status(400).send(e.message);
      res.status(400).send('Invalid');
    }
  });
  app.get('/doctor-fees/excel', async (req, res) => {
    const { dateFrom, dateTo, doctorId, organizationId, status } = req.query;
    const startDay = moment(dateFrom).startOf('day').toDate();
    const endDay = moment(dateTo).endOf('day').toDate();
    try {
      const doctorFees = await prisma.doctorFees.findMany({
        where: Object.assign(
          {
            organizationId,
            doctorId,
          },
          dateTo &&
            dateFrom && {
              date: {
                gte: startDay,
                lte: endDay,
              },
            },
          status && { status }
        ),
        include: {
          doctor: true,
          user: true,
        },
        orderBy: {
          date: 'desc',
        },
      });
      const updatDoctorFees = doctorFees.map(
        ({ name, amount, date, cost, doctor: { name: doctorName } }) => ({
          name,
          amount,
          date,
          doctorName,
          cost,
        })
      );
      let keys = ['doctorName', 'date', 'name', 'amount', 'cost'];

      const workbook = generateExcel(keys, ['doctor-fees'], updatDoctorFees);
      const fileName = 'sessions-statistics.xlsx';
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      await workbook.xlsx.write(res);
      res.end();
    } catch (e) {
      res.status(400).send(e.message);
      res.status(400).send('Invalid');
    }
  });
};

export default init;
