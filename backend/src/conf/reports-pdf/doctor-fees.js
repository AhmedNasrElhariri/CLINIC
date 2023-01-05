import { generatePdf } from '@/services/report.service';
import { prisma } from '../..';
import { formatDateStandard } from '../../services/date.service';
import moment from 'moment';

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
      console.log(e, 'EEE');
      res.status(400).send(e);
      res.status(400).send('Invalid');
    }
  });
};

export default init;
