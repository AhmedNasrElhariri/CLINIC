import { generatePdf } from '@/services/report.service';
import { generateExcel } from '@/services/generate-excel-sheet';
import moment from 'moment';
import { sessionsStatistics } from '@/services/sessions-statistics';

const init = app => {
  app.post('/sessionPdfReport', async (req, res) => {
    const { sessionIds, dateFrom, dateTo } = req.query;
    try {
      const startDay = moment(dateFrom).startOf('day').toDate();
      const endDay = moment(dateTo).endOf('day').toDate();
      const statistics = await sessionsStatistics(sessionIds, startDay, endDay);
      const pdfDoc = await generatePdf(
        '/views/reports/sessions-reports-pdf.ejs',
        {
          statistics: statistics,
        }
      );
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=cash.pdf');
      res.end(pdfDoc);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.get('/sessionExcelReport', async (req, res) => {
    const { sessionIds, dateFrom, dateTo } = req.query;
    try {
      const startDay = moment(dateFrom).startOf('day').toDate();
      const endDay = moment(dateTo).endOf('day').toDate();
      const statistics = await sessionsStatistics(sessionIds, startDay, endDay);
      let keys = ['name', 'totalNumber', 'totalPrice'];

      const workbook = generateExcel(keys, ['sessions-statistics'], statistics);

      var fileName = 'sessions-statistics.xlsx';
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      await workbook.xlsx.write(res);
      res.end();
    } catch (e) {
      res.status(400).send(e);
      res.status(400).send('Invalid');
    }
  });
  ///excel
};
export default init;