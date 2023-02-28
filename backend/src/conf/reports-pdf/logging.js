import { generatePdf } from '@/services/report.service';
import { generateExcel } from '@/services/generate-excel-sheet';
import moment from 'moment';
import { formatDateStandard } from '@/services/date.service';
import { prisma } from '../..';

const init = app => {
  app.post('/logging/pdf', async (req, res) => {
    const {
      dateFrom,
      dateTo,
      userId,
      model,
      tagName,
      organizationId,
    } = req.query;
    try {
      const startDay = moment(dateFrom).startOf('day').toDate();
      const endDay = moment(dateTo).endOf('day').toDate();
      const loggings = await prisma.logging.findMany({
        where: Object.assign(
          {
            organizationId,
          },
          dateTo &&
            dateFrom && {
              date: {
                gte: startDay,
                lte: endDay,
              },
            },
          userId && {
            userId: userId,
          },
          model && {
            model: model,
          },
          tagName && {
            tagName: tagName,
          }
        ),
        include: {
          user: true,
        },
      });
      const pdfDoc = await generatePdf('/views/reports/logging.ejs', {
        logging: loggings,
        formatDateStandard: formatDateStandard,
      });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
      res.end(pdfDoc);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });
  app.get('/logging/excel', async (req, res) => {
    const {
      dateFrom,
      dateTo,
      userId,
      model,
      tagName,
      organizationId,
    } = req.query;
    try {
      const startDay = moment(dateFrom).startOf('day').toDate();
      const endDay = moment(dateTo).endOf('day').toDate();
      const loggings = await prisma.logging.findMany({
        where: Object.assign(
          {
            organizationId,
          },
          dateTo &&
            dateFrom && {
              date: {
                gte: startDay,
                lte: endDay,
              },
            },
          userId && {
            userId: userId,
          },
          model && {
            model: model,
          },
          tagName && {
            tagName: tagName,
          }
        ),
        include: {
          user: true,
        },
      });
      const updatedLoggings = loggings.map(
        ({ date, user: { name: userName }, text }) => ({
          date: formatDateStandard(date),
          user: userName,
          text,
        })
      );
      let keys = ['date', 'user', 'text'];

      const workbook = generateExcel(keys, ['logging'], updatedLoggings);

      const fileName = 'logging.xlsx';
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
  ///excel
};
export default init;
